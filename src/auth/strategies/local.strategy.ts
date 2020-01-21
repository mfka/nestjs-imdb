import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserVerifier } from '../../users/user.verifier';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userVerifier: UserVerifier) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userVerifier.verifyByCredentials({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
