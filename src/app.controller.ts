import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  readonly health: boolean = true;

  @Get()
  healthCheck(): { health: boolean } {
    return { health: this.health };
  }
}
