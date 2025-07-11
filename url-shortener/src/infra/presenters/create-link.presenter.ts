import { Link } from '@/domain/entities/link';
import { env } from '@/env';

interface CreateLinkPresenter {
  originalLink: string;
  shortLink: string;
  owner?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  id: string;
}

export class HttpCreateLinkPresenter {
  static toHttp(link: Link): CreateLinkPresenter {
    return {
      originalLink: link.originalLink,
      shortLink: `http://${env.HOST}/${link.shortLink}`,
      owner: link.owner,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
      id: link.id.toString(),
    };
  }
}
