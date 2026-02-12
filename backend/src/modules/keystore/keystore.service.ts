import { Injectable } from '@nestjs/common';
import { KeystoreRepository } from './keystore.repository';
import { ICreateKeyStore } from './keystore.interface';

@Injectable()
export class KeystoreService {
  constructor(private readonly keystoreRepository: KeystoreRepository) {}

  async create(createKeyStore : ICreateKeyStore) {
    return await this.keystoreRepository.create(createKeyStore);
  }
}
