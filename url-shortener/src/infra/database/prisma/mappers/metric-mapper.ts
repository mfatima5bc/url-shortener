import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Metric } from '@/domain/entities/metric';
import { Prisma, Metric as PrismaMetric } from '@prisma/client';

export class PrismaMetricMapper {
  static toDomain(raw: PrismaMetric): Metric {
    return Metric.create(
      {
        linkId: raw.linkId,
        clickCount: raw.clicksCount,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(metric: Metric): Prisma.MetricUncheckedCreateInput {
    return {
      id: metric.id.toString(),
      linkId: metric.linkId.toString(),
      clicksCount: metric.clickCount,
      createdAt: metric.createdAt,
      updatedAt: metric.updatedAt,
    };
  }
}
