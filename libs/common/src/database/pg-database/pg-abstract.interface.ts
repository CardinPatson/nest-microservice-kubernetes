import { DeepPartial, FindManyOptions, FindOneOptions, PrimaryGeneratedColumn, UpdateResult} from "typeorm";

export interface PGAbstractInterface<T>{

  create(data: DeepPartial<T>): T;

  createMany(data: DeepPartial<T>[]): T[];

  save(data: DeepPartial<T>): Promise<T>;

  saveMany(data: DeepPartial<T>): Promise<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterQuery: FindOneOptions<T>): Promise<T>;

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;

  findOneAndDelete(id: number);

  preload(entityLike: DeepPartial<T>): Promise<T>;

  remove(data:T): Promise<T>;
}

export class PGAbstractData{
  @PrimaryGeneratedColumn()
  id: number;
}