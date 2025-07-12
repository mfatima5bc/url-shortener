import { ResponseType, success } from '@/core/types/response-type';

import { ListPaginatedParams, Pagination } from '@/core/types/pagination';
import { Link } from '../entities/link';
import { LinkRepository } from '../repositories/link-repository';
import { BaseUseCaseError } from './errors/base-error';

interface listLinkInput extends Pagination {
  userId: string;
}

type listLinkOutput = ResponseType<BaseUseCaseError, ListPaginatedParams<Link>>;

export class ListLinkUseCase {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    userId,
    limit,
    page,
  }: listLinkInput): Promise<listLinkOutput> {
    const linkData = await this.linkRepository.listByUser({
      userId,
      limit,
      page,
    });

    return success(linkData);
  }
}
