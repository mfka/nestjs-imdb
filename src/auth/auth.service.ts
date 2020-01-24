import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.entity';
import { JwtResponse } from './jwt-response.interface';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  public async login(user: User): Promise<JwtResponse> {
    const payload: JwtPayload = { username: user.email, sub: user.id.toString() };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public registerUser(userPayload: RegisterDto): void {
    this.userService.create(userPayload);
  }
}
