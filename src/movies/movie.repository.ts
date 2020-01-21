import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { Movie } from './movie.entity';
import { SortField } from './sort-fields.enum';
import { SortOrder } from '../common/sorting/oder.enum';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  public(): Promise<Movie[]> {
    return this.find();
  }

  public getAllSortedQuery(sort: SortField, order: SortOrder): SelectQueryBuilder<Movie> {
    return this.sortBy(sort, order);
  }

  private sortBy(sort: SortField, order: SortOrder): SelectQueryBuilder<Movie> {
    return this.queryBuilder.orderBy(sort, order);
  }

  private get queryBuilder(): SelectQueryBuilder<Movie> {
    return this.createQueryBuilder();
  }
}
