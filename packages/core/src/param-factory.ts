import { PARAM_TYPE_METADATA } from '@heaveless/common';
import { PARAMS_METADATA } from './constants';
import { ParamMetadata } from './types';
import { extractParamNames } from './utils';

export function paramDecoratorFactory(
  metadata: Partial<ParamMetadata> & { [key: string]: any },
) {
  return (target: InstanceType<any>, methodName: string, index: number) => {
    const params =
      Reflect.getMetadata(PARAMS_METADATA, target[methodName]) ?? [];

    const argType = Reflect.getMetadata(
      PARAM_TYPE_METADATA,
      target,
      methodName,
    )[index];

    const argName = extractParamNames(target[methodName])[index];

    params[index] = {
      argName,
      argType,
      index,
      methodName,
      ...metadata,
    };

    params
      .filter((param: ParamMetadata) => param.paramType === metadata.paramType)
      .forEach((param: ParamMetadata, index: number) => {
        param.callIndex = index;
      });

    Reflect.defineMetadata(PARAMS_METADATA, params, target[methodName]);
  };
}
