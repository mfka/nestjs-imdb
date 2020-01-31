import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

import { JwtPayload } from './jwt-payload.interface';
import { JwtResponse } from './jwt-response.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  public login(user: User): JwtResponse {
    const payload: JwtPayload = { username: user.email, sub: user.id.toString() };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public registerUser(userPayload: RegisterDto): Promise<User> {
    return this.userService.create(userPayload);
  }
}
