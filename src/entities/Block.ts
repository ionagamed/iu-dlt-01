import { DatabaseEntity } from './DatabaseEntity'

interface BlockFields {
  readonly databaseModel: any
  readonly _id: string
  readonly hash: string
  readonly nonce: number
  readonly previousBlockHash: string
  readonly content: string
}

export interface Block extends BlockFields {
}

export class Block implements DatabaseEntity {
  constructor (params: BlockFields) {
    Object.assign(this, params)
  }
}
