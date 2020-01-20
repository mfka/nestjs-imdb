import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { JwtPayload } from "./jwt-payload.interface";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async login(user: User) {
    const payload: JwtPayload = { username: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
