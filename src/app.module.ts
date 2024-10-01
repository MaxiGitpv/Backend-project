import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { MoviesModule } from "./movies/movies.module";
import { MoviesController } from "./movies/movies.controller";
import { MoviesService } from "./movies/movies.service";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "./users/users.module";
import * as dotenv from "dotenv";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./users/users.service";
import { UserController } from "./users/users.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: "MaxMovieInlaze", 
      signOptions: { expiresIn: "60s" }, // tiempo de expiración
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRoot("mongodb://localhost/MaxmovieDB"),
    HttpModule,
    AuthModule,
    MoviesModule,
    UsersModule,
  ],
  controllers: [AuthController, MoviesController, UserController],
  providers: [AuthService, MoviesService, UserService],
})
export class AppModule {}
