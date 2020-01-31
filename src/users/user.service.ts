import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { NewUserDto } from './dto/new-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async create({ email, password }: NewUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(email, password));
  }
}
