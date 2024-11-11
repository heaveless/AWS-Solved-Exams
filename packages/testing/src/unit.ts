import { ClassConstructor, getDependenciesFromClass } from '@heaveless/common';

export class UnitTest {
  private providers = new Map<
    ClassConstructor,
    InstanceType<ClassConstructor>
  >();

  constructor(private provider: ClassConstructor) {}

  compile() {
    const dependencies = getDependenciesFromClass(this.provider);
    for (const dependency of dependencies) {
      const instance = new dependency();
      this.providers.set(dependency, instance);
    }
    return new this.provider(...this.providers.values());
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
