import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import { AppModule } from "./app.module";

import { ClassValidatorException } from "./util/class-validator-exeption";
import { PrismaClientExceptionFilter } from "./util/prisma-client-exception.filter";

const PORT = "8080";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    req.headers["content-type"] = "application/json";
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => new ClassValidatorException(errors),
    })
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("ONEBITE BOOKS API")
    .setDescription(`한입 도서몰 API 서버 문서입니다.`)
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme();
  const options = {
    explorer: false,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  };

  SwaggerModule.setup(`api`, app, document, options);
  await app.listen(PORT);
}
bootstrap();
