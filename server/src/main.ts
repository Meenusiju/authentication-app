import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URI, //provide client uri here
  });
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
