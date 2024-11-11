import { isUndefined } from '@heaveless/common';
import { Injectable } from '@heaveless/core';

@Injectable()
export class ConfigService {
  private cached = new Map<string, any>();

  private getFromProcessEnv<T = any>(propertyPath: string): T | undefined {
    let cachedValue = this.cached.get(propertyPath);

    if (isUndefined(cachedValue)) {
      cachedValue = process.env[propertyPath as string] as unknown as T;
      this.cached.set(propertyPath, cachedValue);
    }

    return cachedValue;
  }

  get<T = any>(propertyPath: string, defaultValue?: T): T | undefined {
    const processEnvValue = this.getFromProcessEnv(propertyPath);

    if (!isUndefined(processEnvValue)) {
      return processEnvValue;
    }

    return defaultValue;
  }
}
