import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Link } from '@/domain/entities/link';
import { Prisma, Link as PrismaLink } from '@prisma/client';

export class PrismaLinkMapper {
  static toDomain(raw: PrismaLink): Link {
    return Link.create(
      {
        originalLink: raw.originalLink,
        shortLink: raw.shortLink,
        owner: raw.owner,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(link: Link): Prisma.LinkUncheckedCreateInput {
    return {
      id: link.id.toString(),
      originalLink: link.originalLink,
      shortLink: link.shortLink,
      owner: link.owner,
      active: link.active,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    };
  }
}
