import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import * as typeOrmConfig from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MovieModule } from './movies/movie.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule, MovieModule],
  controllers: [AppController],
})
export class AppModule {}
