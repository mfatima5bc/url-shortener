import { FastifyReply, FastifyRequest } from 'fastify';

export async function checkJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    if (request.url === '/generate') {
      return;
    }
    reply.status(401).send({
      message: 'Unauthorized',
    });
  }
}
