import { CreateLinkUseCase } from '@/domain/use-cases/create-link';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';
import { PrismaMetricsRepository } from '../database/prisma/repositories/prisma-metrics-repository';

export function makeCreateLinkUseCase() {
  const metricsRepository = new PrismaMetricsRepository();
  const linksRepository = new PrismaLinksRepository();

  const createLinkUseCase = new CreateLinkUseCase(
    linksRepository,
    metricsRepository,
  );

  return createLinkUseCase;
}
