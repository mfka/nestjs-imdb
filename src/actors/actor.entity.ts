import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../movies/movie.entity';

export const TABLE_NAME = 'actors';

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public firstname: string;

  @Column()
  @ApiProperty()
  public lastname: string;

  @Column()
  @ApiProperty()
  public photo: string;

  @Column()
  @ApiProperty()
  public imdbUrl: string;

  @ManyToOne(type => Movie, movie => movie.actors)
  public movie: Movie;
}
