import { Module } from "@nestjs/common";
import { PasswordManager } from "./password.manager";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserVerifier } from "./user.verifier";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [PasswordManager, UserVerifier],
  exports: [UserVerifier]
})
export class UserModule {}
