import { ClassConstructor, getDependenciesFromClass } from '@heaveless/common';
import { TestFactory } from './factory';

export class IntegrationTest implements TestFactory {
  private providers = new Map<
    ClassConstructor,
    InstanceType<ClassConstructor>
  >();

  constructor(private provider: ClassConstructor) {}

  private resolve(provider: ClassConstructor) {
    const dependencies = getDependenciesFromClass(provider);

    const resolveDeps = [] as ClassConstructor[];

    for (const dependency of dependencies) {
      const instance = this.resolve(dependency);
      resolveDeps.push(instance);
      this.providers.set(dependency, instance);
    }

    return new provider(...resolveDeps);
  }

  compile() {
    return this.resolve(this.provider);
  }

  update<
    C extends ClassConstructor,
    K extends keyof InstanceType<C>,
    R extends ReturnType<InstanceType<C>[K]> extends Promise<infer U>
      ? U
      : ReturnType<InstanceType<C>[K]>,
  >(provide: C, method: K, returnValue: R): void {
    const dependencies = this.providers.get(provide)!;
    dependencies[method] = () => returnValue;
  }
}
