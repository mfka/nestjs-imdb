import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import * as argon2 from 'argon2';

import { User } from '../../src/users/user.entity';

const createUser = async (email: string, password: string): Promise<User> => {
  const encoded = await argon2.hash(password);
  const user = User.create({ email, password: encoded });

  return user.save();
};

const signInUser = (app: INestApplication, payload: { username: string; password: string }): request.Test => {
  return request(app.getHttpServer())
    .post('/auth/login')
    .send(payload);
};

export const getTestAccessToken = async (app: INestApplication): Promise<string> => {
  const password = 'password123';

  const user = await createUser(`user${Date.now()}@test.co`, 'password123');

  const { body } = await signInUser(app, { username: user.email, password });

  return body.accessToken;
};
