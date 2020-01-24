import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  public email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @ApiProperty({ example: 'admin' })
  public password: string;
}
