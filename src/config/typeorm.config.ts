import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`dist/seeds/*.js`],
  synchronize: true,
  migrationsRun: process.env.NODE_ENV === 'development',
  cli: {
    migrationsDir: 'src/migrations',
  },
};
// the only way to make it works with TypeORM cli :(
export = typeOrmConfig;
