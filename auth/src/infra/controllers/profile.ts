import { FastifyReply, FastifyRequest } from 'fastify';
import { makeProfileUseCase } from '../factories/make-profile-use-case';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const registerUseCase = makeProfileUseCase();

  const result = await registerUseCase.execute({
    userId: request.user.sub,
  });

  if (result.isError()) {
    return reply.status(401).send(result.value);
  }

  return reply.status(200).send(result);
}
