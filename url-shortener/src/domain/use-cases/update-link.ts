import { error, ResponseType, success } from '@/core/types/response-type';

import { Link } from '../entities/link';
import { LinkRepository } from '../repositories/link-repository';
import { BaseUseCaseError } from './errors/base-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface updateLinkInput {
  link: string;
  newOrigin: string;
  userId: string;
}

type updateLinkOutput = ResponseType<
  BaseUseCaseError,
  {
    link: Link;
  }
>;

export class UpdateLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    link,
    newOrigin,
    userId,
  }: updateLinkInput): Promise<updateLinkOutput> {
    const linkData = await this.linkRepository.findByShortLink(link);

    if (!linkData || !linkData?.active) {
      return error(new ResourceNotFoundError());
    }

    if (!linkData.owner || linkData.owner !== userId) {
      return error(new UnauthorizedError());
    }

    const result = await this.linkRepository.updateOrigin(
      linkData.id.toString(),
      newOrigin,
    );

    return success({
      link: result,
    });
  }
}
