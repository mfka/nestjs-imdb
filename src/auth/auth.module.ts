import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../users/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const JWT_EXPIRATION_TIME = 60 * 60;

const passportModule = PassportModule.register({ defaultStrategy: JwtStrategy.STRATEGY_NAME });

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION_TIME,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [passportModule],
})
export class AuthModule {}
