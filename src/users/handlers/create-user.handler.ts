import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../user.repository';
import { PasswordManager } from '../password.manager';
import { User } from '../user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository, private readonly passwordManager: PasswordManager) {}
  async execute({ email, password }: CreateUserCommand): Promise<User> {
    if (await this.repository.findByEmail(email)) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordManager.encode(password);

    return this.repository.create({ email, password: hashedPassword }).save();
  }
}
