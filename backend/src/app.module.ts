  import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { KeystoreModule } from './modules/keystore/keystore.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    KeystoreModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
