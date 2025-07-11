import { RedirectUseCase } from '@/domain/use-cases/redirect';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';
import { PrismaMetricsRepository } from '../database/prisma/repositories/prisma-metrics-repository';

export function makeRedirectUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const metricsRepository = new PrismaMetricsRepository();

  const usecase = new RedirectUseCase(linksRepository, metricsRepository);
  return usecase;
}
