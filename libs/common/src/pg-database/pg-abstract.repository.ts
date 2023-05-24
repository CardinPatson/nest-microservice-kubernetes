import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere,UpdateResult, Repository } from "typeorm";
import { PGAbstractInterface, PGAbstractData } from "./pg-abstract.interface";
import { Logger } from "nestjs-pino";

//THIS CLASS IS AN ABSTRACTION THAT ALL MICROSERVICE WILL USE IN OTHER TO HAVE SCALABLE APP
export  abstract class PGAbstractRepository<T extends PGAbstractData> implements PGAbstractInterface<T>{
  
  // protected abstract readonly logger: Logger
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>){
    this.entity = entity
  }
  // constructor(protected readonly entity: Repository<T>){}

  async save(data: DeepPartial<T>): Promise<T>{
    return await this.entity.save(data)
  }

  async saveMany(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data)
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.entity.create(data)
  }

  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.create(data)
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options)
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {id}
    return await this.entity.findOneBy(options)
  }

  async findByCondition(filterQuery: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterQuery)  
  }

  async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations)
  }

  async findOneAndDelete(id: number) {
    return await this.entity.delete(id)
  }

  async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike)
  }


  async remove(data: T): Promise<T> {
    return await this.entity.remove(data)
  }
}
