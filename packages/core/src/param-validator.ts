import { ZodSchamaStatic } from './extensions';
import { ParamMetadata } from './types';

export class ParamValidator {
  static async validate(params: ParamMetadata[], args: any[]) {
    for (const [i, arg] of args.entries()) {
      const validator: any = params[i].argType;

      if (validator.zodSchema) {
        const zodValidator: ZodSchamaStatic<any> = validator;
        const parseResult = zodValidator.createSafe(arg);
        if (!parseResult.success) {
          const { error } = parseResult;
          const message = error.errors
            .map((error) => `${error.path.join('.')}: ${error.message}`)
            .join(', ');

          throw new Error(`Input validation failed: ${message}`);
        }
      }
    }
  }
}
