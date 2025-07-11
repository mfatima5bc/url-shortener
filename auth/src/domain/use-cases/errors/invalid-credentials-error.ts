import { UseCaseError } from '@/core/errors/use-case-error';
import { BaseUseCaseError } from './base-error';

export class InvalidCredentialsError extends BaseUseCaseError {
  constructor() {
    super('Invalid credentials.');
  }
}
