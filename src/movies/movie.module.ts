import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieProvider } from './movie.provider';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  providers: [MovieProvider],
  controllers: [MovieController],
})
export class MovieModule {}
