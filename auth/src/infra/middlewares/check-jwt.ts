import { FastifyReply, FastifyRequest } from 'fastify';

export async function checkJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({
      message: 'Unauthorized',
    });
  }
}
