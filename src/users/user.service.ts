import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewUserDto } from './dto/new-user.dto';
import { CreateUserCommand } from './commands/create-user.command';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async create({ email, password }: NewUserDto): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(email, password));
  }
}
