import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../../src/app.module';
import { getTestAccessToken } from '../utils/get-token';
import { resetDatabase } from '../utils/reset-database';
import { Movie } from '../../dist/movies/movie.entity';

describe('(GET) /movies/:id', () => {
  let token;
  let app;

  beforeAll(async () => {
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
        .get('/movies/1')
        .expect(401)
        .expect({
          statusCode: 401,
          error: 'Unauthorized',
        }));
  });

  describe('When movie exists', () => {
    it('Return Movie object', async () => {
      token = await getTestAccessToken(app);
      const movie = await Movie.create({
        title: 'Hello Movie',
        director: 'Andrzej Gołota',
        year: new Date('996'),
        metascore: 6.66,
        poster: '',
      }).save();
      const response = await request(app.getHttpServer())
        .get(`/movies/${movie.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toEqual({
        id: movie.id,
        title: 'Hello Movie',
        director: 'Andrzej Gołota',
        year: 996,
        metascore: 6.66,
        poster: '',
        actors: [],
      });
    });
  });

  describe('When movie not exists', () => {
    it('Return not found', async () => {
      token = await getTestAccessToken(app);

      return request(app.getHttpServer())
        .get(`/movies/10000`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  afterAll(async () => {
    await resetDatabase();
    await app.close();
  });
});
