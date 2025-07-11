import { error, ResponseType, success } from '@/core/types/response-type';

import { LinkRepository } from '../repositories/link-repository';
import { MetricRepository } from '../repositories/metric-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface redirectInput {
  link: string;
}

type redirectOutput = ResponseType<
  ResourceNotFoundError,
  {
    originalLink: string;
  }
>;

export class RedirectUseCase {
  constructor(
    private linkRepository: LinkRepository,
    private metricRepository: MetricRepository,
  ) {}

  async execute({ link }: redirectInput): Promise<redirectOutput> {
    const alreadyExists = await this.linkRepository.findByShortLink(link);

    if (!alreadyExists) {
      return error(new ResourceNotFoundError());
    }

    const metric = await this.metricRepository.findByLink(
      alreadyExists.id.toString(),
    );

    if (metric)
      await this.metricRepository.updateCount(
        metric.id.toString(),
        metric.clickCount + 1,
      );

    return success({
      originalLink: alreadyExists.originalLink,
    });
  }
}
