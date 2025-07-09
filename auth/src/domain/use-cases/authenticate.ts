import { error, ResponseType, success } from '@/core/types/response-type';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hasher-comparer';
import { UsersRepository } from '../repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

type AuthenticateUseUseCaseOutput = ResponseType<
  InvalidCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseInput): Promise<AuthenticateUseUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return error(new InvalidCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return error(new InvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return success({
      accessToken,
    });
  }
}
