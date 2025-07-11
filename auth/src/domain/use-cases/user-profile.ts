import { error, ResponseType, success } from '@/core/types/response-type';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseInput {
  userId: string;
}

type GetUserProfileUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  {
    user: {
      name: string;
      email: string;
    };
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
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
