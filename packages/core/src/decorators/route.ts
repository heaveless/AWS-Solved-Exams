import { HttpMethodType } from '../types';
import { methodDecoratorFactory } from '../method-factory';

export function Delete(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.DELETE,
    url,
  });
}

export function Get(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.GET,
    url,
  });
}

export function Head(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.HEAD,
    url,
  });
}

export function Options(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.OPTIONS,
    url,
  });
}

export function Patch(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.PATCH,
    url,
  });
}

export function Post(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.POST,
    url,
  });
}

export function Put(url = '', status?: number) {
  return methodDecoratorFactory({
    status,
    type: HttpMethodType.PUT,
    url,
  });
}
