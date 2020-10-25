import { Container } from 'inversify'
import { Document, Model } from 'mongoose'
import { BlockModel } from '../db/models'
import { Block } from '../entities'
import { BlockMapper, Mapper } from '../mappers'
import { Repository } from '../repositories'
import { BlockSerializer } from '../serializers'
import {
  BlockHasher,
  BlockMiner,
  BlockService,
  BlockVerifier,
  GenesisBlockGenerator,
  MainPageController
} from '../services'
import { deps } from './deps'

export const container = new Container()

container.bind<Model<any>>(deps.BlockModel).toConstantValue(BlockModel)
container.bind<Mapper<Document, Block>>(deps.BlockMapper).to(BlockMapper)
container.bind<Repository<Block>>(deps.BlockRepository)
  .toDynamicValue(() => new Repository<Block>(
    BlockModel,
    container.get<BlockMapper>(deps.BlockMapper)
  ))

container.bind<BlockHasher>(deps.BlockHasher).to(BlockHasher)
container.bind<BlockVerifier>(deps.BlockVerifier).to(BlockVerifier)
container.bind<BlockMiner>(deps.BlockMiner).to(BlockMiner)
container.bind<BlockService>(deps.BlockService).to(BlockService)

container.bind<GenesisBlockGenerator>(deps.GenesisBlockGenerator).to(GenesisBlockGenerator)

container.bind<BlockSerializer>(deps.BlockSerializer).to(BlockSerializer)

container.bind<MainPageController>(deps.MainPageController).to(MainPageController)
