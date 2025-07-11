import { error, ResponseType, success } from '@/core/types/response-type';

import { Metric } from '../entities/metric';
import { LinkRepository } from '../repositories/link-repository';
import { MetricRepository } from '../repositories/metric-repository';
import { BaseUseCaseError } from './errors/base-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface updateMetricInput {
  link: string;
  userId: string;
}

type updateMetricOutput = ResponseType<BaseUseCaseError, { metric: Metric }>;

export class UpdateMetricUseCase {
  constructor(
    private metricRepository: MetricRepository,
    private linkRepository: LinkRepository,
  ) {}

  async execute({
    link,
    userId,
  }: updateMetricInput): Promise<updateMetricOutput> {
    const linkData = await this.linkRepository.findByShortLink(link);

    if (!linkData || !linkData.active) {
      return error(new ResourceNotFoundError());
    }

    if (!linkData?.owner || linkData?.owner !== userId) {
      return error(new UnauthorizedError());
    }

    const metric = await this.metricRepository.findByLink(
      linkData.id.toString(),
    );

    if (!metric) {
      return error(new ResourceNotFoundError());
    }
    metric.clickCount += 1;

    const result = await this.metricRepository.updateCount(
      metric.id.toString(),
      metric.clickCount,
    );

    return success({ metric: result });
  }
}
