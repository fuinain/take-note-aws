import { ICreateKeyStore } from './keystore.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class KeystoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateKeyStore) {
    return this.prisma.keyStore.create({ data });
  }
}
