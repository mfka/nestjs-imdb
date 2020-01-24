import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { PasswordManager } from './password.manager';
import { UserRepository } from './user.repository';
import { CreateUserHandler } from './handlers/create-user.handler';
import { UserVerifier } from './user.verifier';
import { UserService } from './user.service';

export const CommandHandlers = [CreateUserHandler];
export const EventHandlers = [CreateUserHandler];
const repositoryModule = TypeOrmModule.forFeature([UserRepository]);
@Module({
  imports: [repositoryModule, CqrsModule],
  providers: [PasswordManager, UserVerifier, UserService, ...CommandHandlers, ...EventHandlers],
  exports: [UserVerifier, repositoryModule, UserService],
})
export class UserModule {}
