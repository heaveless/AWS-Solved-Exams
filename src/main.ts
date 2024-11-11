import { Context, Handler } from 'aws-lambda';
import serverlessKoa from '@codegenie/serverless-express';
import { ApplicationFactory } from '@heaveless/core';
import { Configuration } from './configuration';

let cachedServer: Handler;

const bootstrap = async () => {
  const app: any = await ApplicationFactory.create(Configuration);
  cachedServer = serverlessKoa({ app });

  return cachedServer;
};

export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
