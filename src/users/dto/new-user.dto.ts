import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { UserInterface } from '../user.interface';

export class NewUserDto implements UserInterface {
  @IsEmail()
  @IsString()
  @ApiProperty()
  public email: string;

  @Transform(password => password.trim())
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @ApiProperty({ description: 'Strong password require min. 4 and max. 48 characters' })
  public password: string;
}
