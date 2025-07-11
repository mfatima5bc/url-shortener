import { DeleteLinkUseCase } from '@/domain/use-cases/delete-link';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';

export function makeDeleteLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();

  const createLinkUseCase = new DeleteLinkUseCase(linksRepository);

  return createLinkUseCase;
}
