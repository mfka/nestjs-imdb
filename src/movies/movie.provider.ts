import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { MovieRepository } from './movie.repository';
import { Movie } from './movie.entity';
import { MoviesSortDto } from './dto/movies-sort.dto';

@Injectable()
export class MovieProvider {
  constructor(private readonly movieRepository: MovieRepository) {}

  getSortedPaginated(
    { sortBy: sort, sortOrder: order }: MoviesSortDto,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<Movie>> {
    const query = this.movieRepository.getAllSortedQuery(sort, order);
    return paginate<Movie>(query, paginationOptions);
  }

  async getById(id: number): Promise<Movie> {
    try {
      return await this.movieRepository.findOneOrFail(id, { relations: ['actors'] });
    } catch (error) {
      throw new NotFoundException("Movie doesn't exists");
    }
  }
}
