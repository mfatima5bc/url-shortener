import { Metric } from '@/domain/entities/metric';
import { MetricRepository } from '@/domain/repositories/metric-repository';
import { PrismaMetricMapper } from '../mappers/metric-mapper';
import { prisma } from '../prisma.service';

export class PrismaMetricsRepository implements MetricRepository {
  async findByLink(linkId: string): Promise<Metric | null> {
    const metricResult = await prisma.metric.findUnique({
      where: {
        linkId,
      },
    });

    if (!metricResult) return null;

    return PrismaMetricMapper.toDomain(metricResult);
  }
  async updateCount(metricId: string, count: number): Promise<Metric> {
    const updatedMetric = await prisma.metric.update({
      where: {
        id: metricId,
      },
      data: {
        clicksCount: count,
      },
    });

    return PrismaMetricMapper.toDomain(updatedMetric);
  }
  async findById(id: string): Promise<Metric | null> {
    const metric = await prisma.metric.findUnique({
      where: {
        id: id,
      },
    });

    if (!metric) return null;

    return PrismaMetricMapper.toDomain(metric);
  }
  async create(metric: Metric): Promise<void> {
    const data = PrismaMetricMapper.toPrisma(metric);

    await prisma.metric.create({
      data,
    });
  }
}
