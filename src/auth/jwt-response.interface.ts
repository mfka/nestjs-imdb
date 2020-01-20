import { ApiProperty } from "@nestjs/swagger";

export class JwtResponse {
  @ApiProperty()
  readonly accessToken: string;
}
