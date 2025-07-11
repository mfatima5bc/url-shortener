import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateLinkUseCase } from '../factories/make-create-link';

export async function createLink(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    originalLink: z.string(),
  });

  const user = request.user?.sub || null;

  const { originalLink } = registerBodySchema.parse(request.body);

  const registerUseCase = makeCreateLinkUseCase();

  const result = await registerUseCase.execute({
    originalLink,
    userId: user,
  });

  return reply.status(201).send(result);
}
