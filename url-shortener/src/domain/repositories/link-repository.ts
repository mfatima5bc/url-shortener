import { ListPaginatedParams, Pagination } from '../../core/types/pagination';
import { Link } from '../entities/link';

interface LinksByUserParams extends Pagination {
  userId: string;
}

export interface LinkRepository {
  findById(id: string): Promise<Link | null>;
  findByOriginalLink(link: string): Promise<Link | null>;
  findByShortLink(link: string): Promise<Link | null>;
  listByUser(data: LinksByUserParams): Promise<ListPaginatedParams<Link>>;
  create(link: Link): Promise<void>;
  delete(linkId: string): Promise<void>;
  updateOrigin(linkId: string, newOrigin: string): Promise<Link>;
}
