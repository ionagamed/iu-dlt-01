import { inject, injectable } from 'inversify'
import { Block } from '../entities'
import { deps } from '../injector/deps'
import { BlockHasher } from './BlockHasher'
import { BlockVerifier } from './BlockVerifier'

@injectable()
export class BlockMiner {
  @inject(deps.BlockHasher) private blockHasher!: BlockHasher
  @inject(deps.BlockVerifier) private blockVerifier!: BlockVerifier

  async mine (block: Block): Promise<Block> {
    let nonce = 0
    while (!this.blockVerifier.isBlockValid(block)) {
      block = await this.blockHasher.computeHash({
        ...block,
        nonce
      })
      nonce += 1
    }
    return block
  }
}
