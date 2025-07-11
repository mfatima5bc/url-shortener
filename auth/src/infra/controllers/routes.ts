import { FastifyInstance } from 'fastify';
import { checkJwt } from '../middlewares/check-jwt';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { register } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/authenticate', authenticate);
  app.post('/register', register);
  app.get('/me', { onRequest: [checkJwt] }, profile);
}
