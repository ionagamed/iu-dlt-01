import * as crypto from 'crypto'
import { injectable } from 'inversify'
import { Block } from '../entities'

@injectable()
export class BlockHasher {
  async computeHash (block: Block): Promise<Block> {
    const parts = [
      String(block.nonce),
      String(block.previousBlockHash),
      String(block.content)
    ]
    const fingerprint = parts.join('#')
    const hash = crypto.createHash('sha256')
    hash.update(fingerprint)
    return new Block({
      ...block,
      hash: hash.digest().toString('hex')
    })
  }
}
