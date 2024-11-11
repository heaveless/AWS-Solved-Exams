import { RETURN_TYPE_METADATA } from '@heaveless/common';
import { METHOD_METADATA } from './constants';
import { MethodMetadata } from './types';

export function methodDecoratorFactory(
  metadata: Partial<MethodMetadata> & { [key: string]: any },
) {
  return (
    target: object,
    methodName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const methods =
      Reflect.getMetadata(METHOD_METADATA, target.constructor) ?? [];
    const returnType = Reflect.getMetadata(
      RETURN_TYPE_METADATA,
      target,
      methodName,
    );

    methods.push({
      methodName,
      returnType: returnType === Promise ? null : returnType,
      ...metadata,
    });

    Reflect.defineMetadata(METHOD_METADATA, methods, target.constructor);

    return descriptor;
  };
}
