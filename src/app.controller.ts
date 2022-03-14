import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  homePage() {
    return 'Welcome to the movie search database';
  }
}
