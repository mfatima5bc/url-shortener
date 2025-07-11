import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Link, LinkProps } from '@/domain/entities/link';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';

export function makeLink(
  override: Partial<LinkProps> = {},
  id?: UniqueEntityID,
) {
  const link = Link.create(
    {
      originalLink: faker.internet.url(),
      shortLink: crypto.randomBytes(3).toString('hex'),
      owner: faker.string.uuid(),
      ...override,
    },
    id,
  );
  return link;
}
