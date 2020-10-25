import { injectable } from 'inversify'
import { Document } from 'mongoose'
import { Block } from '../entities'
import { Mapper } from './Mapper'

@injectable()
export class BlockMapper implements Mapper<Document & any, Block> {
  fromModel (instance: any): Block {
    return new Block({
      databaseModel: instance,
      _id: instance._id,
      hash: instance.hash,
      nonce: instance.nonce,
      content: instance.content,
      previousBlockHash: instance.previousBlockHash
    })
  }

  toModel (entity: Block): any {
    const origin = entity.databaseModel
    origin.hash = entity.hash
    origin.nonce = entity.nonce
    origin.content = entity.content
    origin.previousBlockHash = entity.previousBlockHash
    return origin
  }
}
