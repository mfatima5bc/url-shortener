import { ResponseType, success } from '@/core/types/response-type';
import { Link } from '../entities/link';

import crypto from 'crypto';
import { Metric } from '../entities/metric';
import { LinkRepository } from '../repositories/link-repository';
import { MetricRepository } from '../repositories/metric-repository';
import { BaseUseCaseError } from './errors/base-error';

interface createLinkInput {
  originalLink: string;
  userId?: string | null;
}

type createLinkOutput = ResponseType<
  BaseUseCaseError,
  {
    link: Link;
  }
>;

export class CreateLinkUseCase {
  constructor(
    private linkRepository: LinkRepository,
    private metricRepository: MetricRepository,
  ) {}

  async execute({
    originalLink,
    userId,
  }: createLinkInput): Promise<createLinkOutput> {
    const alreadyExists =
      await this.linkRepository.findByOriginalLink(originalLink);

    if (alreadyExists) {
      return success({
        link: alreadyExists,
      });
    }

    const shortener_url = crypto.randomBytes(3).toString('hex');

    const link = Link.create({
      originalLink,
      shortLink: shortener_url,
      owner: userId,
    });
    await this.linkRepository.create(link);

    const metric = Metric.create({ linkId: link.id.toString() });
    await this.metricRepository.create(metric);

    return success({ link });
  }
}
