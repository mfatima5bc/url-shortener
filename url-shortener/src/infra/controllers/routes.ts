import { FastifyInstance } from 'fastify';
import { checkJwt } from '../middlewares/check-jwt';
import { createLink } from './create-link';
import { deleteLink } from './delete-link';
import { editLink } from './edit-link';
import { getLink } from './get-link';
import { listLink } from './list-link';
import { redirectLink } from './redirect';

export async function linksRoutes(app: FastifyInstance) {
  app.post('/generate', { onRequest: [checkJwt] }, createLink);
  app.get('/list', { onRequest: [checkJwt] }, listLink);
  app.get('/:link', redirectLink);
  app.delete('/link/:id', { onRequest: [checkJwt] }, deleteLink);
  app.get('/link/:shortLink', { onRequest: [checkJwt] }, getLink);
  app.put('/link/:shortLink', { onRequest: [checkJwt] }, editLink);
}
