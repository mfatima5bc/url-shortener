import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { InMemoryMetricRepository } from '@/test/repositories/in-memory-metrics-repository';
import { ListLinkUseCase } from './list-link';

let linkRepository: InMemoryLinkRepository;
let metricRepository: InMemoryMetricRepository;
let sut: ListLinkUseCase;

describe('List links', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    sut = new ListLinkUseCase(linkRepository);

    const link = makeLink({ owner: 'user-test' });
    const link0 = makeLink({ owner: 'user-test' });
    const link1 = makeLink({ owner: 'user-test' });
    const link2 = makeLink({ owner: 'user-test' });
    const link3 = makeLink({ owner: 'user-test2' });
    const link4 = makeLink({ owner: 'user-test3' });
    const link5 = makeLink({ owner: 'user-test4' });
    const link6 = makeLink({ owner: 'user-test' });
    const link7 = makeLink({ owner: 'user-test' });
    const link8 = makeLink({ owner: 'user-test' });

    linkRepository.create(link);
    linkRepository.create(link0);
    linkRepository.create(link1);
    linkRepository.create(link2);
    linkRepository.create(link3);
    linkRepository.create(link4);
    linkRepository.create(link5);
    linkRepository.create(link6);
    linkRepository.create(link7);
    linkRepository.create(link8);
  });

  it('should be able to list links by user', async () => {
    const result = await sut.execute({
      userId: 'user-test',
      limit: 10,
      page: 1,
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          owner: 'user-test',
        }),
      ]),
      hasNextPage: false,
      page: 1,
    });
  });

  it('should be able to list links by user paginated', async () => {
    const result = await sut.execute({
      userId: 'user-test',
      limit: 4,
      page: 1,
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          owner: 'user-test',
        }),
      ]),
      hasNextPage: true,
      page: 1,
    });
  });
});
