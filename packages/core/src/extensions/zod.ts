import { z } from 'zod';

export type CompatibleZodIssue = {
  message: string;
  path: (string | number)[];
};

export type CompatibleZodSafe =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      error: {
        issues: CompatibleZodIssue[];
        errors: CompatibleZodIssue[];
      };
    };

export type CompatibleZodType = Pick<
  z.ZodType<unknown>,
  '_input' | '_output'
> & {
  parse: (...args: any[]) => unknown;
  safeParse: (...args: any[]) => CompatibleZodSafe;
};

export type CompatibleZodInfer<T extends CompatibleZodType> = T['_output'];

export type ZodSchamaStatic<T> = {
  new (): T;
  zodSchema: CompatibleZodType;
  create(input: unknown): T;
  createSafe(input: unknown): CompatibleZodSafe;
};

export const createZodSchema = <T extends CompatibleZodType>(
  zodSchema: T,
): ZodSchamaStatic<CompatibleZodInfer<T>> => {
  class SchemaHolderClass {
    public static zodSchema = zodSchema;

    public static create(input: unknown): T {
      return this.zodSchema.parse(input) as T;
    }

    public static createSafe(input: unknown): CompatibleZodSafe {
      return this.zodSchema.safeParse(input);
    }
  }

  return SchemaHolderClass;
};
