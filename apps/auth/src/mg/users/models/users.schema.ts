import { MGAbstractDocument } from '@app/common/database';
import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({versionKey: false})
export class UserDocument extends MGAbstractDocument{
  @Prop()
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)