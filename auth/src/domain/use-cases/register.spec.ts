import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { RegisterUseCase } from './register';
import { FakeHasher } from 'test/cryptography/fake-hasher';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
let fakeHasher: FakeHasher;

describe('User registration', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterUseCase(usersRepository, fakeHasher);
  });

  it('should be able to register', async () => {
    const result = await sut.execute({
      name: 'Fátima',
      email: 'fafa@email.com',
      password: 'newpassword',
    });

    expect(result.isSuccess()).toBe(true);
    expect(result).toEqual(
      expect.objectContaining({
        value: {
          user: usersRepository.items[0],
        },
      }),
    );
  });

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'Tiago Potter',
      email: 'tiago.potter@wizzard.com',
      password: 'avadakedabra',
    });

    const hashedPassword = await fakeHasher.hash('avadakedabra');

    expect(result.isSuccess()).toBe(true);
    expect(usersRepository.items[0].passwordHash).toEqual(
      hashedPassword,
    );
  });
});
