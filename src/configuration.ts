import IoRedis from 'ioredis';
import { useAdapter } from '@type-cacheable/ioredis-adapter';
import dynamoose from 'dynamoose';
import bodyParser from '@koa/bodyparser';
import cors from '@koa/cors';
import {
  ApplicationConfiguration,
  ApplicationOptions,
  ApplicationOptionsFactory,
} from '@heaveless/core';

import ENLanguage from './i18n/en';
import ESLanguage from './i18n/es';

import { HealthController } from '@modules/health/health.controller';
import { PlanetController } from '@modules/planet/planet.controller';

export class Configuration implements ApplicationOptionsFactory {
  beforeConfigure(): Promise<void> | void {
    // dynamodb
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      region: process.env.CONF_REGION,
      endpoint: process.env.CONF_DYNAMODB_ENDPOINT,
      credentials: {
        accessKeyId: String(process.env.CONF_AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.CONF_AWS_SECRET_ACCESS_KEY),
      },
    });
    dynamoose.aws.ddb.set(ddb);

    // redis
    const redis = new IoRedis({
      host: process.env.CONF_REDIS_HOST,
      port: Number(process.env.CONF_REDIS_PORT),
      password: process.env.CONF_REDIS_PASSWORD,
    });
    useAdapter(redis);
  }

  configure(): Promise<ApplicationOptions> | ApplicationOptions {
    return {
      name: 'aws-starwars',
      version: '1.0.0',
      controllers: [HealthController, PlanetController],
      translate: {
        es: ESLanguage,
        en: ENLanguage,
      },
    };
  }

  afterConfigure({ server }: ApplicationConfiguration): Promise<void> | void {
    server.use(bodyParser());
    server.use(cors({ origin: '*' }));
    server.setGlobalPrefix('api');
  }
}
