import { ListLinkUseCase } from '@/domain/use-cases/list-link';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';
import { UpdateLinkUseCase } from '@/domain/use-cases/update-link';

export function makeUpdateLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();

  const updateLinkUseCase = new UpdateLinkUseCase(linksRepository);
  return updateLinkUseCase;
}
