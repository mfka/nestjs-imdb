import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PasswordManager } from './password.manager';

@Injectable()
export class UserVerifier {
  constructor(private readonly userRepository: UserRepository, private readonly passwordManager: PasswordManager) {}

  private isPasswordValid(user: User, password: string): Promise<boolean> {
    return this.passwordManager.verify(user.password, password);
  }

  async verifyByCredentials({ username: email, password }: AuthCredentialsDto): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await this.isPasswordValid(user, password))) {
      return user;
    }
    return null;
  }
}
