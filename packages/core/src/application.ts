import Koa from 'koa';
import Router from '@koa/router';
import compose from 'koa-compose';
import onFinished from 'on-finished';
import tinyI18n from 'tiny-i18n';
import { ClassConstructor, Type } from '@heaveless/common';
import { Reflector } from './reflector';
import { MethodInfo } from './types';
import { addLeadingSlash, buildUrl } from './utils';
import { RouteHandler } from './route-handler';
import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import { RootContainer } from './root-container';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { respond } from './helpers';

interface LanguageProps {
  [key: string]: string;
}

export interface ApplicationOptions {
  name: string;
  version: string;
  controllers: ClassConstructor[];
  translate: {
    es: LanguageProps;
    en: LanguageProps;
  };
}

export interface ApplicationConfiguration {
  server: ApplicationFactory;
}

export interface ApplicationOptionsFactory {
  beforeConfigure(): Promise<void> | void;
  configure(): Promise<ApplicationOptions> | ApplicationOptions;
  afterConfigure(config: ApplicationConfiguration): Promise<void> | void;
}

export class ApplicationFactory extends Koa {
  private globalPrefix: string = '';

  constructor(private readonly config: ApplicationOptions) {
    super();
  }

  static async create(
    ConfigurationFactory: Type<ApplicationOptionsFactory>,
  ): Promise<ApplicationFactory> {
    const configFactory = new ConfigurationFactory();
    await configFactory.beforeConfigure();
    const appOptions = await configFactory.configure();

    const koaServer = new ApplicationFactory(appOptions);

    await configFactory.afterConfigure({
      server: koaServer,
    });

    return koaServer;
  }

  setGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix;
  }

  private scanDependencies(providers: ClassConstructor[]) {
    return providers.reduce<Set<ClassConstructor>>((records, provider) => {
      records.add(provider);
      const dependencies = Reflector.getDependenciesMetadata(provider);
      const stack = [...dependencies];

      while (stack.length) {
        const currentDependency = stack.pop()!;
        records.add(currentDependency);

        const childDependencies =
          Reflector.getDependenciesMetadata(currentDependency);
        stack.push(...childDependencies);
      }

      return records;
    }, new Set());
  }

  private registerRoute(methodInfo: MethodInfo, router: Router) {
    const { type, url, methodName, instance, params } = methodInfo;

    const handler = RouteHandler.createHandler(instance, methodName, params);
    router[type](url, handler);
  }

  private resolve() {
    const { controllers } = this.config;

    const router = new Router();

    controllers.forEach((controller) => {
      const ctrlMetadata = Reflector.getControllerMetadata(controller);

      ctrlMetadata.methods.forEach((method) => {
        const params = Reflector.getParamsMetadata(
          controller,
          method.methodName,
        );

        const paths = [this.globalPrefix, ctrlMetadata.url, method.url].filter(
          Boolean,
        );
        const url = addLeadingSlash(buildUrl(...paths));

        this.registerRoute(
          {
            instance:
              RootContainer.get<InstanceType<ClassConstructor>>(controller),
            type: method.type,
            methodName: method.methodName,
            params,
            url,
          },
          router,
        );
      });
    });

    this.use(router.routes());
  }

  private handleRequest(ctx: any, fnMiddleware: any) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = (err: any) => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  private initialize() {
    const { controllers, translate } = this.config;

    tinyI18n.setDictionary(translate.es, 'es');
    tinyI18n.setDictionary(translate.en, 'en');

    const records = this.scanDependencies(controllers);
    RootContainer.provide(records);
  }

  callback(): (
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse,
  ) => Promise<void> {
    this.initialize();
    this.resolve();

    // koa code

    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req: any, res: any) => {
      const ctx = this.createContext(req, res);
      if (!this.ctxStorage) {
        return this.handleRequest(ctx, fn);
      }
      return this.ctxStorage.run(ctx, async () => {
        return await this.handleRequest(ctx, fn);
      });
    };

    return handleRequest;
  }

  listen(...args: any[]): Server {
    this.initialize();
    this.resolve();

    // koa code

    const server = createServer(this.callback());
    return server.listen(...args);
  }
}
