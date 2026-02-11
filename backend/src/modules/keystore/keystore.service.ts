import { Injectable } from '@nestjs/common';
import { KeystoreRepository } from './keystore.repository';

@Injectable()
export class KeystoreService {
  constructor(private readonly keystoreRepository: KeystoreRepository) {}

  async create(data: any) {
    return this.keystoreRepository.create(data);
  }
}
