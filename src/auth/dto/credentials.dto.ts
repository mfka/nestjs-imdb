import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  public username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @ApiProperty({ example: 'admin' })
  public password: string;
}
