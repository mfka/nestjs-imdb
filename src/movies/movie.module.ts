import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieProvider } from './movie.provider';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository]), AuthModule],
  providers: [MovieProvider],
  controllers: [MovieController],
})
export class MovieModule {}
