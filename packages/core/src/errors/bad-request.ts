import { HttpStatusCode } from 'axios';
import { ApiError } from './api-error';

export class BadRequestError extends ApiError {
  status = HttpStatusCode.BadRequest;
}
