import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { usersRoutes } from './controllers/routes';
import { errorHandler } from './error-handler';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, {
  secret: {
    public: readFileSync(
      `${path.join(__dirname, '..', '..', 'certs', 'public.key')}`,
      'utf-8',
    ),
    private: readFileSync(
      `${path.join(__dirname, '..', '..', 'certs', 'private.key')}`,
      'utf-8',
    ),
  },

  sign: {
    algorithm: 'RS256',
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
