import { ClassConstructor } from '@heaveless/common';

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export interface TestFactory {
  compile(): InstanceType<ClassConstructor>;
  update<
    C extends ClassConstructor,
    K extends keyof InstanceType<C>,
    R extends UnwrapPromise<ReturnType<InstanceType<C>[K]>>,
  >(
    provide: C,
    method: K,
    returnValue: R,
  ): void;
}
