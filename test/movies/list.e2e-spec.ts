import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as faker from 'faker';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { getTestAccessToken } from '../utils/get-token';
import { resetDatabase } from '../utils/reset-database';
import { Movie } from '../../src/movies/movie.entity';

const createMultipleMovies = (n: number): void => {
  [...Array(n).keys()].map(async e => {
    const index = e + 1;
    await Movie.create({
      title: `Movie ${index}`,
      director: faker.name.findName(),
      year: new Date(`200${index}`),
      metascore: 6.61,
      poster: faker.random.image(),
    }).save();
  });
};

describe('(GET) /movies', () => {
  let token;
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('When JWT token is missing', () => {
    it('Return Unauthorized', () =>
      request(app.getHttpServer())
        .get('/movies')
        .expect(401)
        .expect({
          statusCode: 401,
          error: 'Unauthorized',
        }));
  });

  describe('When sort and order are provided', () => {
    it('Return sorted movies ', async () => {
      token = await getTestAccessToken(app);
      createMultipleMovies(3);

      const { body } = await request(app.getHttpServer())
        .get(`/movies`)
        .query({ sortBy: 'title', orderSort: 'desc' })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.items[0].title).toStrictEqual('Movie 3');
    });
  });

  describe('When sort by param is out of scope', () => {
    it('Return bad request ', async () => {
      token = await getTestAccessToken(app);

      return request(app.getHttpServer())
        .get(`/movies`)
        .query({ sortBy: 'director', orderSort: 'desc' })
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });

  describe('When limit param is provided', () => {
    it('Return only limited number of movies', async () => {
      token = await getTestAccessToken(app);
      createMultipleMovies(5);

      const { body } = await request(app.getHttpServer())
        .get(`/movies`)
        .query({ limit: 3 })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.items).toHaveLength(3);
      expect(body.totalItems).toEqual(5);
    });
  });

  describe('When limit and page params are provided', () => {
    it('Return only limited number of movies from certain page', async () => {
      token = await getTestAccessToken(app);
      createMultipleMovies(5);

      const { body } = await request(app.getHttpServer())
        .get(`/movies`)
        .query({ limit: 3, page: 2 })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.items).toHaveLength(2);
      expect(body.next).toStrictEqual('');
    });
  });

  describe('When there is no movies', () => {
    it('Return empty list', async () => {
      token = await getTestAccessToken(app);
      createMultipleMovies(3);

      const { body } = await request(app.getHttpServer())
        .get(`/movies`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.items).toHaveLength(3);
      expect(body.previous).toStrictEqual('');
      expect(body.next).toStrictEqual('');
    });
  });

  afterEach(async () => {
    await resetDatabase();
    await app.close();
  });
});
