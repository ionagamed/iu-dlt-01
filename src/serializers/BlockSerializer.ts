import { inject, injectable } from 'inversify'
import { Block } from '../entities'
import { deps } from '../injector/deps'
import { BlockVerifier } from '../services'

@injectable()
export class BlockSerializer {
  @inject(deps.BlockVerifier) private blockVerifier!: BlockVerifier

  serialize (block: Block): any {
    return {
      _id: block._id,
      hash: block.hash,
      nonce: block.nonce,
      previousBlockHash: block.previousBlockHash,
      isValid: this.blockVerifier.isBlockValid(block),
      content: block.content
    }
  }
}
