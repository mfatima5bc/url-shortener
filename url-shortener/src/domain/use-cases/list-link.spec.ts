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
    const link1 = makeLink({ owner: 'user-test' });
    const link2 = makeLink({ owner: 'user-test' });
    const link3 = makeLink({ owner: 'user-test2' });

    linkRepository.create(link);
    linkRepository.create(link1);
    linkRepository.create(link2);
    linkRepository.create(link3);
  });

  it('should be able to list links by user', async () => {
    const result = await sut.execute({
      userId: 'user-test',
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual({
      links: expect.arrayContaining([
        expect.objectContaining({
          owner: 'user-test',
        }),
      ]),
    });
  });
});
