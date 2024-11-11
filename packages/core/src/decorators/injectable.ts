import { ClassConstructor, PARAM_TYPE_METADATA } from '@heaveless/common';
import { INJECTABLE_METADATA } from '../constants';

export function Injectable() {
  return (target: ClassConstructor) => {
    const params = Reflect.getMetadata(PARAM_TYPE_METADATA, target) ?? [];

    Reflect.defineMetadata(INJECTABLE_METADATA, params, target);
  };
}
