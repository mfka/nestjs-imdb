import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/credentials.dto";
import { JwtResponse } from "./jwt-response.interface";
import { SwaggerTags } from "../config/swagger.config";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../users/user.entity";

@Controller("auth")
@ApiTags(SwaggerTags.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(AuthGuard("local"))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: "User has been successfully logged in and tokens generated."
  })
  @ApiUnauthorizedResponse({
    description: "User not found: wrong email or password."
  })
  @ApiBadRequestResponse({
    description: "Data validation failed or Bad request."
  })
  @ApiBody({
    type: AuthCredentialsDto,
    required: true
  })
  async login(@Request() { user }: { user: User }): Promise<JwtResponse> {
    return await this.authService.login(user);
  }
}
