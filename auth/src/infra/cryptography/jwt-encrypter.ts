import { Encrypter } from '@/domain/cryptography/encrypter';
import { FastifyInstance } from 'fastify';

export class JwtEncrypter implements Encrypter {
  constructor(private readonly app: FastifyInstance) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.app.jwt.sign(payload);
  }
}
