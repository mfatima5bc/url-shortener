import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface MetricProps {
  linkId: string;
  clickCount: number;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Metric extends Entity<MetricProps> {
  get linkId() {
    return this.props.linkId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get clickCount() {
    return this.props.clickCount;
  }

  set clickCount(data: number) {
    this.props.clickCount = data;
    this.touch();
  }

  static create(
    props: Optional<MetricProps, 'createdAt' | 'clickCount'>,
    id?: UniqueEntityID,
  ) {
    const user = new Metric(
      {
        ...props,
        clickCount: props.clickCount ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}
