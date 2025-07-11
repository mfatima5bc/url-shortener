import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeAuthenticateUseCase } from '../factories/make-authentication-use-case';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authBodySchema.parse(request.body);

  const registerUseCase = makeAuthenticateUseCase();

  const result = await registerUseCase.execute({
    email,
    password,
  });

  if (result.isError()) {
    return reply.status(401).send(result.value);
  }

  return reply.status(200).send(result);
}
