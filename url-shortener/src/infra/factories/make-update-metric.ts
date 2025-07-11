import { UpdateMetricUseCase } from '@/domain/use-cases/update-metric';
import { PrismaLinksRepository } from '../database/prisma/repositories/prisma-links-repository';
import { PrismaMetricsRepository } from '../database/prisma/repositories/prisma-metrics-repository';

export function makeUpdateMetricUseCase() {
  const metricsRepository = new PrismaMetricsRepository();
  const linksRepository = new PrismaLinksRepository();

  const updateMetricUseCase = new UpdateMetricUseCase(
    metricsRepository,
    linksRepository,
  );
  return updateMetricUseCase;
}
