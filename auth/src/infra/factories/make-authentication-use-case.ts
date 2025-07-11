import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate';
import { app } from '../app';
import { BcryptHasher } from '../cryptography/bcrypt-hasher';
import { JwtEncrypter } from '../cryptography/jwt-encrypter';
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository';

export function makeAuthenticateUseCase() {
  const hashComparer = new BcryptHasher();
  const encrypter = new JwtEncrypter(app);
  const usersRepository = new PrismaUsersRepository();

  const authenticateUseCase = new AuthenticateUserUseCase(
    usersRepository,
    hashComparer,
    encrypter,
  );

  return authenticateUseCase;
}
