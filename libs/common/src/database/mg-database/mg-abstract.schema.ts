import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class MGAbstractDocument{
  //property of the schema
  @Prop({type: SchemaTypes.ObjectId})
  _id: Types.ObjectId
}