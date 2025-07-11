import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { InMemoryMetricRepository } from '@/test/repositories/in-memory-metrics-repository';
import { RedirectUseCase } from './redirect';

let linkRepository: InMemoryLinkRepository;
let metricRepository: InMemoryMetricRepository;
let sut: RedirectUseCase;

describe('Redirect link', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    metricRepository = new InMemoryMetricRepository();
    sut = new RedirectUseCase(linkRepository, metricRepository);

    const link = makeLink({
      originalLink: 'https://hefty-litter.net/',
      owner: 'user-test',
      shortLink: 'link-test',
    });
    const link1 = makeLink({ owner: 'user-test' });
    const link2 = makeLink({ owner: 'user-test' });
    const link3 = makeLink({ owner: 'user-test2' });

    linkRepository.create(link);
    linkRepository.create(link1);
    linkRepository.create(link2);
    linkRepository.create(link3);
  });

  it('should be able to redirect', async () => {
    const result = await sut.execute({
      link: 'link-test',
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual({
      originalLink: expect.stringContaining('https://hefty-litter.net/'),
    });
  });
});
