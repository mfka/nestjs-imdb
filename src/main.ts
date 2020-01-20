import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import SwaggerSetup from "./config/swagger.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerSetup(app);
  await app.listen(process.env.PORT);
}
bootstrap();
