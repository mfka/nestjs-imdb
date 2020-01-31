import { Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SwaggerTags } from '../config/swagger.config';
import { User } from '../users/user.entity';
import { FailedDependencyException } from '../exceptions/failed-dependency.exception';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtResponse } from './jwt-response.interface';
import { LocalStrategy } from './strategies/local.strategy';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags(SwaggerTags.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @UseGuards(AuthGuard(LocalStrategy.STRATEGY_NAME))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User has been successfully logged in and tokens generated.',
  })
  @ApiUnauthorizedResponse({
    description: 'User not found: wrong email or password.',
  })
  @ApiBadRequestResponse({
    description: 'Data validation failed or Bad request.',
  })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  login(@Request() { user }: { user: User }): JwtResponse {
    return this.authService.login(user);
  }

  @Post('/register')
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiCreatedResponse({ description: 'User was create' })
  @ApiResponse({ status: HttpStatus.FAILED_DEPENDENCY, description: 'User was not created' })
  @ApiBadRequestResponse({
    description: 'Data validation failed or Bad request.',
  })
  register(@Body() registerPayload: RegisterDto): Promise<User> {
    try {
      return this.authService.registerUser(registerPayload);
    } catch (error) {
      throw new FailedDependencyException('User was not created');
    }
  }
}
