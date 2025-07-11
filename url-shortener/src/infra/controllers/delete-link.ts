import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeDeleteLinkUseCase } from '../factories/make-delete-link';

export async function deleteLink(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    id: z.string(),
  });

  const { id } = requestSchema.parse(request.params);

  const usecase = makeDeleteLinkUseCase();

  console.log(request.params);

  const result = await usecase.execute({
    linkId: id,
    userId: request.user?.sub,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(200).send(result.value);
}
