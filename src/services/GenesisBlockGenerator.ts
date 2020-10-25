import { inject, injectable } from 'inversify'
import { Block } from '../entities'
import { deps } from '../injector/deps'
import { Repository } from '../repositories'
import { BlockMiner } from './BlockMiner'

@injectable()
export class GenesisBlockGenerator {
  @inject(deps.BlockMiner) private blockMiner!: BlockMiner
  @inject(deps.BlockRepository) private blockRepository!: Repository<Block>

  async ensureGenesisBlock () {
    const foundGenesisBlock = await this.blockRepository.findOne({ hash: /^0*$/ })
    if (!foundGenesisBlock) {
      await this.blockRepository.create({
        hash: '0'.repeat(64),
        nonce: 0,
        content: 'Hello everyone!  This is a post from a genesis block - the first block in the chain!',
        previousBlockHash: '0'.repeat(64)
      })
    }
  }
}
