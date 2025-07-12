import { ListPaginatedParams } from '@/core/types/pagination';
import { Link } from '@/domain/entities/link';
import { LinkRepository } from '@/domain/repositories/link-repository';
import { PrismaLinkMapper } from '../mappers/link-mapper';
import { prisma } from '../prisma.service';

export class PrismaLinksRepository implements LinkRepository {
  async findByOriginalLink(link: string): Promise<Link | null> {
    const linkResult = await prisma.link.findFirst({
      where: {
        originalLink: link,
        active: true,
      },
    });

    if (!linkResult) return null;

    return PrismaLinkMapper.toDomain(linkResult);
  }
  async findByShortLink(link: string): Promise<Link | null> {
    const linkResult = await prisma.link.findUnique({
      where: {
        shortLink: link,
        active: true,
      },
    });

    if (!linkResult) return null;

    return PrismaLinkMapper.toDomain(linkResult);
  }
  async listByUser({
    userId,
    limit,
    page,
  }): Promise<ListPaginatedParams<Link>> {
    const [links, count] = await prisma.$transaction([
      prisma.link.findMany({
        where: {
          owner: userId,
          active: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.link.count({
        where: {
          owner: userId,
          active: true,
        },
      }),
    ]);

    if (!links)
      return {
        page,
        hasNextPage: false,
        data: [],
      };

    return {
      page,
      hasNextPage: count >= limit,
      data: links.map(PrismaLinkMapper.toDomain),
    };
  }
  async delete(linkId: string): Promise<void> {
    await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        active: false,
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
        active: true,
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
