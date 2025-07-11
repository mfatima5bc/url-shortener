import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { InMemoryMetricRepository } from '@/test/repositories/in-memory-metrics-repository';
import { CreateLinkUseCase } from './create-link';

let linkRepository: InMemoryLinkRepository;
let metricRepository: InMemoryMetricRepository;
let sut: CreateLinkUseCase;

describe('Generate links', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    metricRepository = new InMemoryMetricRepository();
    sut = new CreateLinkUseCase(linkRepository, metricRepository);
  });

  it('should be able to create a short link', async () => {
    const result = await sut.execute({
      originalLink: 'https://stackoverflow.com/questions',
      userId: 'user-test',
    });

    expect(result.isSuccess()).toBe(true);
    expect(result).toEqual(
      expect.objectContaining({
        value: {
          link: expect.objectContaining({
            owner: 'user-test',
          }),
        },
      }),
    );
  });
});
