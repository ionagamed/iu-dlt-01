import { injectable } from 'inversify'
import { Block } from '../entities'

@injectable()
export class BlockVerifier {
  isBlockValid (block: Block) {
    return block.hash.substring(0, 4) === '0000'
  }
}
