import { inject, injectable } from 'inversify'
import { Block } from '../entities'
import { errors } from '../errors'
import { deps } from '../injector/deps'
import { Repository } from '../repositories'
import { BlockSerializer } from '../serializers'
import { BlockMiner } from './BlockMiner'

@injectable()
export class BlockService {
  @inject(deps.BlockRepository) private blockRepository!: Repository<Block>
  @inject(deps.BlockSerializer) private blockSerializer!: BlockSerializer
  @inject(deps.BlockMiner) private blockMiner!: BlockMiner

  async getPage () {
    const { items } = await this.blockRepository.findMany(
      {}, { limit: 10000, offset: 0, sort: { createdAt: -1 } }
    )
    return items.map(this.blockSerializer.serialize.bind(this.blockSerializer))
  }

  async getLast () {
    const { items } = await this.blockRepository.findMany(
      {}, { limit: 1, offset: 0, sort: { createdAt: -1 } }
    )
    return this.blockSerializer.serialize(items[0])
  }

  async create (content: string) {
    const lastBlock = await this.getLast()
    if (!lastBlock.isValid) {
      throw errors.PREVIOUS_BLOCK_NOT_VALID()
    }

    const block = await this.blockRepository.create({
      content,
      hash: 'none',
      nonce: 0,
      previousBlockHash: lastBlock.hash
    })

    return block
  }

  async mine (_id: string) {
    const block = await this.blockRepository.resolve({ _id })
    const minedBlock = await this.blockMiner.mine(block)
    await this.blockRepository.save(minedBlock)
    return block
  }
}
