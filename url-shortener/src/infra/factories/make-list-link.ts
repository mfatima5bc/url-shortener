import { ListLinkUseCase } from '@/domain/use-cases/list-link';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';

export function makeListLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();

  const listLinkUseCase = new ListLinkUseCase(linksRepository);
  return listLinkUseCase;
}
