import { FakeEncrypter } from '@/infra/cryptography/fake-encrypter';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { AuthenticateUserUseCase } from './authenticate';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

describe('User authentication', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(
      usersRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'fafa@email.com',
      passwordHash: await fakeHasher.hash('newpassword'),
    });

    usersRepository.items.push(user);

    const result = await sut.execute({
      email: 'fafa@email.com',
      password: 'newpassword',
    });

    expect(result.isSuccess()).toBe(true);
    expect(result).toEqual(
      expect.objectContaining({
        value: {
          accessToken: expect.any(String),
        },
      }),
    );
  });
});
