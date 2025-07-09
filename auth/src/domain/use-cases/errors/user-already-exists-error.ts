import { UseCaseError } from '@/core/errors/use-case-error';

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(indentifier: string) {
    super(`User ${indentifier} already exists.`);
  }
}
