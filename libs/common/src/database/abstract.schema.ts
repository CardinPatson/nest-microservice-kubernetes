import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractDocument{
  //property of the schema
  @Prop({type: SchemaTypes.ObjectId})
  _id: Types.ObjectId
}