import { error, ResponseType, success } from '@/core/types/response-type';

import { Link } from '../entities/link';
import { LinkRepository } from '../repositories/link-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface getLinkInput {
  link: string;
}

type getLinkOutput = ResponseType<
  ResourceNotFoundError,
  {
    link: Link;
  }
>;

export class GetLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ link }: getLinkInput): Promise<getLinkOutput> {
    const alreadyExists = await this.linkRepository.findByShortLink(link);

    if (!alreadyExists) {
      return error(new ResourceNotFoundError());
    }

    return success({
      link: alreadyExists,
    });
  }
}
