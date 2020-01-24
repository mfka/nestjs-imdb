import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../user.repository';
import { PasswordManager } from '../password.manager';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository, private readonly passwordManager: PasswordManager) {}
  async execute({ email, password }: CreateUserCommand): Promise<void> {
    const hashedPassword = await this.passwordManager.encode(password);
    await this.repository.create({ email, password: hashedPassword }).save();
  }
}
