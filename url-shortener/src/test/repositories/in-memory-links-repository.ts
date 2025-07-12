import { Link } from '@/domain/entities/link';
import { LinkRepository } from '@/domain/repositories/link-repository';

export class InMemoryLinkRepository implements LinkRepository {
  public items: Link[] = [];

  async findById(id: string): Promise<Link | null> {
    const result =
      this.items.find((item) => item.id.toString() === id && item.active) ||
      null;
    return result;
  }

  async create(link: Link): Promise<void> {
    this.items.push(link);
  }

  async findByOriginalLink(link: string): Promise<Link | null> {
    const result =
      this.items.find((item) => item.originalLink === link && item.active) ||
      null;
    return result;
  }

  async findByShortLink(link: string): Promise<Link | null> {
    const result =
      this.items.find((item) => item.shortLink === link && item.active) || null;
    return result;
  }

  async listByUser(userId: string): Promise<Link[] | []> {
    const result = this.items.filter((item) => item.owner === userId);
    return result;
  }

  async delete(linkId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === linkId);

    this.items[index].active = false;
  }
  async updateOrigin(linkId: string, newOrigin: string): Promise<Link> {
    const index = this.items.findIndex((item) => item.id.toString() === linkId);

    this.items[index].originalLink = newOrigin;

    return this.items[index];
  }
}
