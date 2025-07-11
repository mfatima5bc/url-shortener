import { error, ResponseType, success } from '@/core/types/response-type';

import { LinkRepository } from '../repositories/link-repository';
import { MetricRepository } from '../repositories/metric-repository';
import { BaseUseCaseError } from './errors/base-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface deleteLinkInput {
  linkId: string;
  userId?: string | null;
}

type deleteLinkOutput = ResponseType<BaseUseCaseError, {}>;

export class DeleteLinkUseCase {
  constructor(
    private linkRepository: LinkRepository,
  ) {}

  async execute({
    linkId,
    userId,
  }: deleteLinkInput): Promise<deleteLinkOutput> {
    const link = await this.linkRepository.findById(linkId);

    if (link?.owner !== userId) {
      return error(new UnauthorizedError());
    }

    await this.linkRepository.delete(linkId);

    return success({});
  }
}
