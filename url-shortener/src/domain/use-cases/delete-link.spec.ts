import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeLink } from '@/test/factories/make-link';
import { InMemoryLinkRepository } from '@/test/repositories/in-memory-links-repository';
import { DeleteLinkUseCase } from './delete-link';

let linkRepository: InMemoryLinkRepository;
let sut: DeleteLinkUseCase;

describe('Delete link', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository();
    sut = new DeleteLinkUseCase(linkRepository);

    const link = makeLink({ owner: 'me-me' }, new UniqueEntityID('my-test'));
    linkRepository.items.push(link);
  });

  it('should be able to delete a link', async () => {
    const result = await sut.execute({ linkId: 'my-test', userId: 'me-me' });

    expect(result.isSuccess()).toBe(true);
    expect(result).toEqual(
      expect.objectContaining({
        value: {},
      }),
    );
  });

  it('should not be able to delete a link thats is not yours', async () => {
    const result = await sut.execute({ linkId: 'my-test', userId: 'tu-tu' });

    expect(result.isError()).toBe(true);
  });
});
