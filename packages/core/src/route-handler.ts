import Koa from 'koa';
import { ApiError } from './errors/api-error';
import { ParameterType, ParamMetadata } from './types';
import { toStandardType } from './utils';
import { HttpStatusCode } from 'axios';
import { ParamValidator } from './param-validator';
import { ClassConstructor, Handler } from '@heaveless/common';
import { translateObject } from './extensions/i18n';

export class RouteHandler {
  private static getCookies(ctx: Koa.Context) {
    return ctx.headers.cookie?.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      return { ...acc, [name]: value };
    }, {});
  }

  static async reply(res: Koa.Response, message: any, status: number) {
    if (res.headerSent) {
      return;
    }

    const isJson = typeof message === 'object';

    if (status) {
      res.ctx.status = status;
    }

    if (isJson) {
      res.set('Content-Type', 'application/json');
    }

    res.ctx.body = {
      ...message,
      status,
    };
  }

  static message(message: unknown) {
    if (message instanceof ApiError) {
      return message.toObject();
    }

    if (message instanceof Error) {
      return { message: message.message };
    }

    return { data: message };
  }

  static status(message: unknown, status: number) {
    if (message instanceof ApiError) {
      return message.status;
    }

    if (message instanceof Error) {
      return HttpStatusCode.InternalServerError;
    }

    return status;
  }

  static getParam(
    type: ParameterType,
    ctx: Koa.Context,
    name?: string,
  ): Promise<any> | any {
    const req: any = ctx.request;
    const res = ctx.response;

    switch (type) {
      case ParameterType.BODY:
        return name ? req['body']?.[name] : req['body'];
      case ParameterType.COOKIE:
        return name ? ctx.cookies?.get(name) : this.getCookies(ctx);
      case ParameterType.HEADER:
        return name ? ctx.headers?.[name] : ctx.headers;
      case ParameterType.PARAM:
        return name ? ctx.params?.[name] : ctx.params;
      case ParameterType.QUERY:
        return name ? ctx.query?.[name] : ctx.query;
      case ParameterType.REQUEST:
        return req;
      case ParameterType.RESPONSE:
        return res;
      default:
        return req;
    }
  }

  private static async rundHandler(handler: Handler) {
    try {
      return await handler();
    } catch (error) {
      return error;
    }
  }

  static async params(metadata: ParamMetadata[], ctx: Koa.Context) {
    const params$ = metadata.map((param) =>
      this.getParam(param.paramType, ctx, param.paramName),
    );

    const params = await Promise.all(params$);

    return params.map((param) => toStandardType(param));
  }

  static createHandler(
    controller: InstanceType<ClassConstructor>,
    methodName: string,
    params: ParamMetadata[],
    status = HttpStatusCode.Ok,
  ): Handler {
    const handler = controller[methodName].bind(controller);

    return async (ctx: Koa.Context): Promise<void> => {
      const res = await this.getParam(ParameterType.RESPONSE, ctx);

      const message = await this.rundHandler(async () => {
        const verifiedParams = await this.params(params, ctx);

        await ParamValidator.validate(params, verifiedParams);

        const mapped = verifiedParams.map((param) =>
          translateObject(param, 'es'),
        );
        const response = await handler(...mapped);
        return translateObject(response, 'en');
      });

      await this.reply(
        res,
        this.message(message),
        this.status(message, status),
      );
    };
  }
}
