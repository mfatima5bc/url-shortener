import { Link } from '@/domain/entities/link';
import { LinkRepository } from '@/domain/repositories/link-repository';
import { PrismaLinkMapper } from '../mappers/link-mapper';
import { prisma } from '../prisma.service';

export class PrismaLinksRepository implements LinkRepository {
  async findByOriginalLink(link: string): Promise<Link | null> {
    const linkResult = await prisma.link.findUnique({
      where: {
        originalLink: link,
      },
    });

    if (!linkResult) return null;

    return PrismaLinkMapper.toDomain(linkResult);
  }
  async findByShortLink(link: string): Promise<Link | null> {
    const linkResult = await prisma.link.findUnique({
      where: {
        shortLink: link,
      },
    });

    if (!linkResult) return null;

    return PrismaLinkMapper.toDomain(linkResult);
  }
  async listByUser(userId: string): Promise<Link[] | []> {
    const link = await prisma.link.findMany({
      where: {
        owner: userId,
      },
    });

    if (!link) return [];

    return link.map(PrismaLinkMapper.toDomain);
  }
  async delete(linkId: string): Promise<void> {
    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });
  }
  async updateOrigin(linkId: string, newOrigin: string): Promise<Link> {
    const updatedLink = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        originalLink: newOrigin,
      },
    });

    return PrismaLinkMapper.toDomain(updatedLink);
  }
  async findById(id: string): Promise<Link | null> {
    const link = await prisma.link.findUnique({
      where: {
        id: id,
      },
    });

    if (!link) return null;

    return PrismaLinkMapper.toDomain(link);
  }
  async create(link: Link): Promise<void> {
    const data = PrismaLinkMapper.toPrisma(link);

    await prisma.link.create({
      data,
    });
  }
}
