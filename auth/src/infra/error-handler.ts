import { BaseUseCaseError } from '@/domain/use-cases/errors/base-error';
import { env } from '@/env';
import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO here add a external tool
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation failed',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BaseUseCaseError) {
    return reply.status(reply.statusCode || 400).send({
      message: error.message,
    });
  }

  return reply.status(500).send({ message: 'Internal server error.' });
};
