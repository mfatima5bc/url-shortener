import { Link } from '../entities/link';

export interface LinkRepository {
  findById(id: string): Promise<Link | null>;
  findByOriginalLink(link: string): Promise<Link | null>;
  findByShortLink(link: string): Promise<Link | null>;
  listByUser(userId: string): Promise<Link[] | []>;
  create(link: Link): Promise<void>;
  delete(linkId: string): Promise<void>;
  updateOrigin(linkId: string, newOrigin: string): Promise<Link>;
}
