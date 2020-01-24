import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PasswordManager } from './password.manager';

@Injectable()
export class UserVerifier {
  constructor(private readonly userRepository: UserRepository, private readonly passwordManager: PasswordManager) {}

  private isPasswordValid(user: User, password: string): Promise<boolean> {
    return this.passwordManager.verify(user.password, password);
  }

  async verifyByCredentials({ email, password }: LoginDto): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user && (await this.isPasswordValid(user, password))) {
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Invalid password or email');
    }
  }
}
