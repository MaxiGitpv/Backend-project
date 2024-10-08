import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema, User } from './schema/user.schema';
import {MongooseModule} from '@nestjs/mongoose';


@Module({ 
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule]
})
export class UsersModule {}
