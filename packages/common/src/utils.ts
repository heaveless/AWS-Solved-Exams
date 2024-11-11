import { PARAM_TYPE_METADATA } from './constants';
import { ClassConstructor, Handler } from './types';

export const getDependenciesFromClass = (
  provide: ClassConstructor,
): ClassConstructor[] =>
  Reflect.getMetadata(PARAM_TYPE_METADATA, provide) ?? [];

export const isClass = (type: Handler | ClassConstructor) =>
  typeof type === 'function' && type.toString().startsWith('class');

export const isFunction = (type: Handler | ClassConstructor) =>
  typeof type === 'function' && !isClass(type);

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';

export const isClassMethod = (obj: any, prop: string) =>
  typeof obj[prop] === 'function' && prop !== 'constructor';
