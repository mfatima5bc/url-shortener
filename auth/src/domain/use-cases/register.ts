import { error, ResponseType, success } from '@/core/types/response-type';
import { hash } from 'bcryptjs';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { HashGenerator } from '../cryptography/hasher-generator';

interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

type RegisterUseCaseOutput = ResponseType<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const password_hash = await this.hashGenerator.hash(password);

    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists) {
      return error(new UserAlreadyExistsError(email));
    }

    const user = User.create({
      name,
      email,
      passwordHash: password_hash,
    });

    await this.usersRepository.create(user);

    return success({ user });
  }
}
