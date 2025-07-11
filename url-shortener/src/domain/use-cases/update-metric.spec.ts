import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { InMemoryMetricRepository } from '@/test/repositories/in-memory-metrics-repository';
import { beforeEach, describe, it } from 'vitest';
import { Metric } from '../entities/metric';
import { UpdateMetricUseCase } from './update-metric';

describe('Update Metric', () => {
  let metricRepository: InMemoryMetricRepository;
  let linkRepository: InMemoryLinkRepository;
  let sut: UpdateMetricUseCase;

  beforeEach(() => {
    metricRepository = new InMemoryMetricRepository();
    linkRepository = new InMemoryLinkRepository();
    sut = new UpdateMetricUseCase(metricRepository, linkRepository);
  });

  it('should be able to update metric for a link', async () => {
    const link = makeLink({ owner: 'user-test', shortLink: '123123' });

    const metric = Metric.create({ linkId: link.id.toString() });
    await linkRepository.create(link);
    await metricRepository.create(metric);

    const result = await sut.execute({
      link: '123123',
      userId: 'user-test',
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual(
      expect.objectContaining({
        metric: expect.objectContaining({
          linkId: link.id.toString(),
          clickCount: 1,
        }),
      }),
    );
  });
});
