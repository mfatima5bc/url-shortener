import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface LinkProps {
  originalLink: string;
  shortLink: string;
  owner?: string | null;
  active: boolean;
  expiration?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Link extends Entity<LinkProps> {
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get expiration() {
    return this.props.expiration;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get originalLink() {
    return this.props.originalLink;
  }

  set originalLink(data: string) {
    this.props.originalLink = data;
    this.touch();
  }

  get shortLink() {
    return this.props.shortLink;
  }

  set shortLink(data: string) {
    this.props.shortLink = data;
    this.touch();
  }

  get owner() {
    return this.props.owner;
  }

  get active() {
    return this.props.active;
  }

  set active(data: boolean) {
    this.props.active = data;
    this.touch();
  }

  static create(
    props: Optional<LinkProps, 'createdAt' | 'active' | 'expiration'>,
    id?: UniqueEntityID,
  ) {
    const user = new Link(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}
