import { ClassConstructor } from '@heaveless/common';
import { INJECTABLE_METADATA } from './constants';

export class Container {
  private providers = new Map<ClassConstructor, ClassConstructor[]>();

  provide(providers: Set<ClassConstructor>) {
    providers.forEach((provide) => this.register(provide));
  }

  get<T>(provide: ClassConstructor): T {
    return this.resolve(provide);
  }

  private register(provide: ClassConstructor) {
    const dependencies = Reflect.getMetadata(INJECTABLE_METADATA, provide);
    this.providers.set(provide, dependencies);
  }

  private resolve(provide: ClassConstructor) {
    const dependencies = this.providers.get(provide)!;

    const resolveDeps = [] as ClassConstructor[];

    for (const dependecy of dependencies) {
      const instance = this.resolve(dependecy);
      resolveDeps.push(instance);
    }

    return new provide(...resolveDeps);
  }
}
