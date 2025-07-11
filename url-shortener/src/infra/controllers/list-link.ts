import { FastifyReply, FastifyRequest } from 'fastify';
import { makeListLinkUseCase } from '../factories/make-list-link';

export async function listLink(request: FastifyRequest, reply: FastifyReply) {
  const usecase = makeListLinkUseCase();

  const userId = request.user?.sub;

  const result = await usecase.execute({
    userId,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(200).send(result.value);
}
