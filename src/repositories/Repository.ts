import { injectable } from 'inversify'
import { Model, Document } from 'mongoose'
import { errors } from '../errors'
import { Mapper } from '../mappers'

export interface PaginationParams {
  limit: number
  offset: number
  sort: Record<string, number>
}

export interface PaginatedResult<T> extends PaginationParams {
  items: T[]
  total: number
}

@injectable()
export class Repository<T> {
  constructor (
    private model: Model<any>,
    private mapper: Mapper<Document, T>
  ) {
  }

  async findOne (query: any): Promise<T | undefined> {
    const instance = await this.model.findOne(query)
    if (!instance) {
      return undefined
    }

    return this.mapper.fromModel(instance)
  }

  async resolve (query: any): Promise<T> {
    const entity = await this.findOne(query)
    if (!entity) {
      throw errors.ENTITY_NOT_FOUND(this.model.name, query)
    }

    return entity
  }

  async findMany (query: any, pageParams: PaginationParams): Promise<PaginatedResult<T>> {
    const total = await this.model.countDocuments(query)
    const docs = await this.model.find(query)
      .sort(pageParams.sort)
      .skip(pageParams.offset)
      .limit(pageParams.limit)
    const boundMapper = this.mapper.fromModel.bind(this.mapper)
    const items = docs.map(boundMapper)
    return {
      total,
      items,
      ...pageParams
    }
  }

  async create (params: Omit<T, '_id' | 'databaseModel'>): Promise<T> {
    // eslint-disable-next-line new-cap
    const instance = new this.model(params)
    await instance.save()
    return this.mapper.fromModel(instance)
  }

  async save (entity: T): Promise<T> {
    const instance = this.mapper.toModel(entity)
    await instance.save()
    return entity
  }
}
