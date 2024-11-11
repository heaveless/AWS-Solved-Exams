import { ClassConstructor } from '@heaveless/common';
import { TestFactory, UnwrapPromise } from './factory';
import { IntegrationTest } from './integration';
import { UnitTest } from './unit';

export abstract class Test implements TestFactory {
  static createUnit(classType: ClassConstructor): Test {
    return new UnitTest(classType);
  }

  static createIntegration(classType: ClassConstructor): Test {
    return new IntegrationTest(classType);
  }

  public abstract compile(): InstanceType<ClassConstructor>;

  public abstract update<
    C extends ClassConstructor,
    K extends keyof InstanceType<C>,
    R extends UnwrapPromise<ReturnType<InstanceType<C>[K]>>,
  >(provide: C, method: K, returnValue: R): void;
}
