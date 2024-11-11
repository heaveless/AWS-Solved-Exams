import { ClassConstructor } from '@heaveless/common';
import {
  CONTROLLER_METADATA,
  INJECTABLE_METADATA,
  METHOD_METADATA,
  PARAMS_METADATA,
} from './constants';
import { ControllerMetadata } from './types';

export class Reflector {
  static getDependenciesMetadata(
    provider: ClassConstructor,
  ): ClassConstructor[] {
    return Reflect.getMetadata(INJECTABLE_METADATA, provider) ?? [];
  }

  static getControllerMetadata(
    controller: ClassConstructor,
  ): ControllerMetadata {
    const metadata = Reflect.getMetadata(CONTROLLER_METADATA, controller);
    const methods = Reflect.getMetadata(METHOD_METADATA, controller) ?? [];

    return {
      ...metadata,
      methods,
    };
  }

  static getParamsMetadata(controller: ClassConstructor, methodName: string) {
    const metadata = Reflect.getMetadata(
      PARAMS_METADATA,
      controller.prototype[methodName],
    );
    return metadata ?? [];
  }
}
