import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || "API example")
    .setDescription(process.env.SWAGGER_DESCRIPTION || "API description")
    .setVersion(process.env.SWAGGER_VERSION || "1.0")
    .addTag(process.env.SWAGGER_TAG || "API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Configuración global
  app.setGlobalPrefix("api"); // Prefijo para todas las rutas
  app.enableCors(); // Habilitamos CORS

  // Usamos el puerto desde las variables de entorno o uno por defecto
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
void bootstrap();
