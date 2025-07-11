import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { GetLinkUseCase } from './get-link';

let linkRepository: InMemoryLinkRepository;
let sut: GetLinkUseCase;

describe('Get links', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    sut = new GetLinkUseCase(linkRepository);

    const link = makeLink({ owner: 'user-test', shortLink: 'link-test' });
    const link1 = makeLink({ owner: 'user-test' });
    const link2 = makeLink({ owner: 'user-test' });
    const link3 = makeLink({ owner: 'user-test2' });

    linkRepository.create(link);
    linkRepository.create(link1);
    linkRepository.create(link2);
    linkRepository.create(link3);
  });

  it('should be able get links by user', async () => {
    const result = await sut.execute({
      link: 'link-test',
    });

    expect(result.isSuccess()).toBe(true);

    expect(result.value).toEqual({
      link: expect.objectContaining({
        owner: 'user-test',
        shortLink: 'link-test',
      }),
    });
  });
});
