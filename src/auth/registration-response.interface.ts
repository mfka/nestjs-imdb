import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseInterface {
  @ApiProperty()
  readonly message: string;
}
