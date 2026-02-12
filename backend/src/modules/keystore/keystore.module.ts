import { Module } from '@nestjs/common';
import { KeystoreService } from './keystore.service';
import { KeystoreController } from './keystore.controller';
import { KeystoreRepository } from './keystore.repository';

@Module({
  controllers: [KeystoreController],
  providers: [KeystoreService, KeystoreRepository],
  exports: [KeystoreService],
})
export class KeystoreModule {}
  