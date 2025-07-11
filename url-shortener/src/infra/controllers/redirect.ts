import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeRedirectUseCase } from '../factories/make-redirect-link';

export async function redirectLink(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    link: z.string(),
  });

  const { link } = registerBodySchema.parse(request.params);

  const usecase = makeRedirectUseCase();

  const result = await usecase.execute({
    link,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(301).redirect(result.value.originalLink);
}
