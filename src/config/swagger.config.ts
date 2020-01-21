import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export enum SwaggerTags {
  AUTH = 'auth',
  MOVIES = 'movies',
}

export default (app): void => {
  const options = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESC)
    .setVersion('1.0')
    .addBearerAuth();

  Object.values(SwaggerTags).map((tag: string) => options.addTag(tag));

  const document = SwaggerModule.createDocument(app, options.build());

  SwaggerModule.setup('api', app, document);
};
