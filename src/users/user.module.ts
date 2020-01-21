import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordManager } from './password.manager';
import { UserRepository } from './user.repository';
import { UserVerifier } from './user.verifier';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [PasswordManager, UserVerifier],
  exports: [UserVerifier],
})
export class UserModule {}
