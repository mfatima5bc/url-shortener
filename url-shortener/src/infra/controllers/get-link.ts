import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeGetLinkUseCase } from '../factories/make-get-link';

export async function getLink(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    shortLink: z.string(),
  });

  const { shortLink } = requestSchema.parse(request.params);

  console.log(request.params);

  const usecase = makeGetLinkUseCase();

  const result = await usecase.execute({
    link: shortLink,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(200).send(result.value);
}
