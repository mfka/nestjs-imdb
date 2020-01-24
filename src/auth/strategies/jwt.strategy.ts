import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { JwtPayload } from '../jwt-payload.interface';
import { UserRepository } from '../../users/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public static readonly STRATEGY_NAME = 'jwt';

  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate({ username: email }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  get strategyName(): string {
    return 'jwt';
  }
}
