import { GetUserProfileUseCase } from '@/domain/use-cases/user-profile';
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository';

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();

  const authenticateUseCase = new GetUserProfileUseCase(usersRepository);

  return authenticateUseCase;
}
