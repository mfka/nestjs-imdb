import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../users/user.repository";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

const JWT_EXPIRATION_TIME = 60 * 60;

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION_TIME
      }
    }),
    UserModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
