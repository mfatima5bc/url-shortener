import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeListLinkUseCase } from '../factories/make-list-link';

export async function listLink(request: FastifyRequest, reply: FastifyReply) {
  const usecase = makeListLinkUseCase();

  const userId = request.user?.sub;

  const schema = z.object({
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
  });

  const { limit = 10, page = 1 } = schema.parse(request.query);

  const result = await usecase.execute({
    userId,
    limit,
    page,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(200).send(result.value);
}
