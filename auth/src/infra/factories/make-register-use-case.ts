import { RegisterUseCase } from '@/domain/use-cases/register';
import { BcryptHasher } from '../cryptography/bcrypt-hasher';
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository';

export function makeRegisterUseCase() {
  const hashComparer = new BcryptHasher();
  const usersRepository = new PrismaUsersRepository();

  const authenticateUseCase = new RegisterUseCase(
    usersRepository,
    hashComparer,
  );

  return authenticateUseCase;
}
