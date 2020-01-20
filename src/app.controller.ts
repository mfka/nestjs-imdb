import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck(): { health: boolean } {
    return { health: true };
  }
}
