import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeUpdateLinkUseCase } from '../factories/make-update-link';

export async function editLink(request: FastifyRequest, reply: FastifyReply) {
  const requestSchema = z.object({
    shortLink: z.string(),
  });
  const { shortLink } = requestSchema.parse(request.params);

  const requestBodySchema = z.object({
    newOrigin: z.string().nonempty(),
  });
  const { newOrigin } = requestBodySchema.parse(request.body);

  const usecase = makeUpdateLinkUseCase();

  const result = await usecase.execute({
    link: shortLink,
    newOrigin,
    userId: request.user?.sub,
  });

  if (result.isError()) {
    return reply.status(404).send();
  }

  return reply.status(200).send(result.value);
}
