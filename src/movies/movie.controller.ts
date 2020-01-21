import {
  Controller,
  Get,
  UseGuards,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SwaggerTags } from '../config/swagger.config';
import { MovieProvider } from './movie.provider';
import { Movie, SerializationGroup } from './movie.entity';
import { MoviesSortDto } from './dto/movies-sort.dto';
import { PaginationOptionsDto } from '../common/pagnation/pagination-options.dto';
import { PaginationRoute } from '../common/pagnation/route.decorator';

@ApiBearerAuth()
@Controller('movies')
@UseGuards(AuthGuard('jwt'))
@ApiTags(SwaggerTags.MOVIES)
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieProvider: MovieProvider) {}

  @Get()
  @SerializeOptions({
    groups: [SerializationGroup.LIST],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public getMovies(
    @Query() sortParams: MoviesSortDto,
    @Query() paginationParams: PaginationOptionsDto,
    @Req() @PaginationRoute() route: string,
  ): Promise<Pagination<Movie>> {
    const paginationOptions = { route, ...paginationParams };
    return this.movieProvider.getSortedPaginated(sortParams, paginationOptions);
  }

  @Get(':id')
  @SerializeOptions({
    groups: [SerializationGroup.DETAILS],
  })
  public getMovie(@Param('id') id: number): Promise<Movie> {
    return this.movieProvider.getById(id);
  }
}
