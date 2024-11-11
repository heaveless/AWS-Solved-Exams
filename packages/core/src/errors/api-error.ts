import { HttpStatusCode } from 'axios';

export class ApiError extends Error {
  errors?: unknown[];
  status = HttpStatusCode.BadRequest;

  constructor(message?: string, errors?: unknown[]) {
    super(message);

    this.errors = errors;
  }

  toObject() {
    return {
      errors: this.errors,
      message: this.message,
    };
  }
}
