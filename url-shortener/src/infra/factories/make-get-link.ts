import { GetLinkUseCase } from '@/domain/use-cases/get-link';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';

export function makeGetLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();

  const usecase = new GetLinkUseCase(linksRepository);
  return usecase;
}
