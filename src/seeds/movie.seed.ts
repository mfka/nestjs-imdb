/* eslint-disable */

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Actor } from '../actors/actor.entity';

export class seedMovies1579077173179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const actorsRepository = getRepository(Actor);

    const jokerActors: {}[] = [
      {
        firstname: 'Joaquin',
        lastname: 'Phoenix',
        photo:
          'https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_.jpg',
        imdbUrl: 'https://www.imdb.com/name/nm0001618/',
      },
      {
        firstname: 'Robert',
        lastname: 'De Niro',
        photo:
          'https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_UY317_CR13,0,214,317_AL_.jpg',
        imdbUrl: 'https://www.imdb.com/name/nm0000134/',
      },
    ];

    const godfatherActors: {}[] = [
      {
        firstname: 'Marlon',
        lastname: 'Brando',
        photo:
          'https://m.media-amazon.com/images/M/MV5BMTg3MDYyMDE5OF5BMl5BanBnXkFtZTcwNjgyNTEzNA@@._V1_UY317_CR97,0,214,317_AL_.jpg',
        imdbUrl: 'https://www.imdb.com/name/nm0000008/',
      },
      {
        firstname: 'Al',
        lastname: 'Pacino',
        photo:
          'https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_UX214_CR0,0,214,317_AL_.jpg',
        imdbUrl: 'https://www.imdb.com/name/nm0000199/',
      },
    ];

    const hapinessActors: {}[] = [
      {
        firstname: 'Will',
        lastname: 'Smith',
        photo:
          'https://m.media-amazon.com/images/M/MV5BNTczMzk1MjU1MV5BMl5BanBnXkFtZTcwNDk2MzAyMg@@._V1_UY317_CR2,0,214,317_AL_.jpg',
        imdbUrl: 'https://www.imdb.com/name/nm0000226/',
      },
      {
        firstname: 'Jade',
        lastname: 'Smith',
        photo:
          'https://m.media-amazon.com/images/M/MV5BMjMwMjU2MTQ4MF5BMl5BanBnXkFtZTgwODM5OTMzODE@._V1_UX214_CR0,0,214,317_AL_.jpg4e',
        imdbUrl: 'https://www.imdb.com/name/nm1535523/',
      },
    ];

    const movies: {}[] = [
      {
        title: 'Joker',
        year: new Date('2019'),
        director: 'Todd Phillips',
        metascore: 8.6,
        poster:
          'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
        actors: await actorsRepository.save(jokerActors),
      },
      {
        title: 'The Godfather',
        year: new Date('1972'),
        director: 'Francis Ford Coppola',
        metascore: 9.2,
        poster:
          'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg',
        actors: await actorsRepository.save(godfatherActors),
      },
      {
        title: 'The Pursuit of Happyness',
        year: new Date('2006'),
        director: 'Gabriele Muccino',
        metascore: 8.0,
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_SY1000_CR0,0,672,1000_AL_.jpg',
        actors: await actorsRepository.save(hapinessActors),
      },
    ];
    await getRepository(Movie).save(movies);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
