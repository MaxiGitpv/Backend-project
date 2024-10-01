import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string = "";

  @Prop({ required: true, unique: true })
  email: string = "";

  @Prop({ required: true })
  password: string = "";

  @Prop({ default: false })
  isDeleted: boolean = false;
}

export const UserSchema = SchemaFactory.createForClass(User);
