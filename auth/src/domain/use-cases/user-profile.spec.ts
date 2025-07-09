import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { GetUserProfileUseCase } from './user-profile';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('User data', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('Get user by id', async () => {
    const id = new UniqueEntityID('user-id');
    await usersRepository.create(makeUser());
    await usersRepository.create(makeUser());
    await usersRepository.create(makeUser({}, id));

    const result = await sut.execute({ userId: id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(result).toEqual(
      expect.objectContaining({
        value: {
          user: expect.objectContaining({
            _id: id,
          }),
        },
      }),
    );
  });
});
