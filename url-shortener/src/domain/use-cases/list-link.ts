import { ResponseType, success } from '@/core/types/response-type';

import { Link } from '../entities/link';
import { LinkRepository } from '../repositories/link-repository';
import { BaseUseCaseError } from './errors/base-error';

interface listLinkInput {
  userId: string;
}

type listLinkOutput = ResponseType<
  BaseUseCaseError,
  {
    links: Link[];
  }
>;

export class ListLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({ userId }: listLinkInput): Promise<listLinkOutput> {
    const linkData = await this.linkRepository.listByUser(userId);

    return success({
      links: linkData,
    });
  }
}
