import { BaseUseCaseError } from './base-error';

export class UnauthorizedError extends BaseUseCaseError {
  constructor() {
    super('Unauthorized.');
  }
}
