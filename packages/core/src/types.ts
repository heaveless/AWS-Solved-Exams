import { ClassConstructor } from '@heaveless/common';

export enum HttpMethodType {
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

export enum ParameterType {
  BODY = 'body',
  COOKIE = 'cookie',
  HEADER = 'header',
  PARAM = 'path',
  QUERY = 'query',
  REQUEST = 'request',
  RESPONSE = 'response',
}

export interface MethodInfo {
  instance: InstanceType<ClassConstructor>;
  type: HttpMethodType;
  methodName: string;
  params: ParamMetadata[];
  url: string;
}

export interface ControllerMetadata {
  url: string;
  methods: MethodMetadata[];
}

export interface MethodMetadata {
  methodName: string;
  returnType: ClassConstructor;
  type: HttpMethodType;
  url: string;
}

export interface ParamMetadata {
  argName?: string;
  argType?: ClassConstructor;
  callIndex: number;
  index: number;
  methodName: string;
  paramName: string;
  paramType: ParameterType;
}
