import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import * as typeOrmConfig from './config/typeorm.config';
import { MovieModule } from './movies/movie.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MovieModule],
  controllers: [AppController],
})
export class AppModule {}
