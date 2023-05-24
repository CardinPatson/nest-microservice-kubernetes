import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbsctractRepository<TDocument extends AbstractDocument>{
  protected abstract readonly logger: Logger
  constructor(protected readonly model: Model<TDocument>){}

  //take a document that will use to create new entity (and we will omit the _id fields)
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument>{

    // provide there the property of the new object in the database 
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId()
    })  
    return (await createdDocument.save()).toJSON() as unknown as TDocument
  }

  //lean to return the document as a plain javascript object
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
    const document = await this.model.findOne(filterQuery, {}, {lean: true})
    if(!document){
      this.logger.warn("Document not found with this filterQuery", filterQuery)
      throw new NotFoundException("Document not found")
    }
    return document
  }

  //new: true (return the new update document)
  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>){
    const document = await this.model.findOneAndUpdate(filterQuery , update, {lean: true, new: true})
    if(!document){
      this.logger.warn("Document not found with this filterQuery", filterQuery)
      throw new NotFoundException("Document not found")
    }

    return document
  }

  async find(filterQuery: FilterQuery<TDocument>){
    //return an array of TDocument (second param is rejection)
    return this.model.find(filterQuery, {} , {lean:true })
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>){
    return this.model.findOneAndDelete(filterQuery, {lean : true})
  }
}