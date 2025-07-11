import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateLinkUseCase } from '../factories/make-create-link';
import { HttpCreateLinkPresenter } from '../presenters/create-link.presenter';

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

  if (result.isError()) {
    return reply.status(400).send({ message: 'Link creation failed' });
  }

  return reply
    .status(201)
    .send(HttpCreateLinkPresenter.toHttp(result.value.link));
}
