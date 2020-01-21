import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordManager {
  public encode(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public verify(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);
  }
}
