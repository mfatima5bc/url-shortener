import { error, ResponseType, success } from '@/core/types/response-type';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseInput {
  userId: string;
}

type GetUserProfileUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseInput): Promise<GetUserProfileUseCaseOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return error(new ResourceNotFoundError());
    }

    return success({
      user,
    });
  }
}
