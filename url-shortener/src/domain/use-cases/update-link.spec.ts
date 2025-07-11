import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { UpdateLinkUseCase } from './update-link';

let linkRepository: InMemoryLinkRepository;
let sut: UpdateLinkUseCase;

describe('Update links', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    sut = new UpdateLinkUseCase(linkRepository);
  });

  it('should be able to update a link original url', async () => {
    const link = makeLink(
      { shortLink: '123456', owner: 'my-link' },
      new UniqueEntityID('my-link'),
    );
    linkRepository.items.push(link);

    const updated = await sut.execute({
      link: '123456',
      newOrigin: 'https://www.libhunt.com/r/TypeScript',
      userId: 'my-link',
    });

    expect(updated.isSuccess()).toBe(true);
    expect(updated).toEqual(
      expect.objectContaining({
        value: {
          link: expect.objectContaining({
            owner: 'my-link',
            shortLink: '123456',
          }),
        },
      }),
    );
  });
});
