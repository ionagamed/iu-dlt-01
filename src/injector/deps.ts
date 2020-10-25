export const deps = {
  BlockModel: Symbol.for('BlockModel'),
  BlockRepository: Symbol.for('BlockRepository'),
  BlockMapper: Symbol.for('BlockMapper'),
  TransactionMapper: Symbol.for('TransactionMapper'),

  BlockHasher: Symbol.for('BlockHasher'),
  BlockVerifier: Symbol.for('BlockVerifier'),
  BlockMiner: Symbol.for('BlockMiner'),
  BlockService: Symbol.for('BlockService'),

  GenesisBlockGenerator: Symbol.for('GenesisBlockGenerator'),

  BlockSerializer: Symbol.for('BlockSerializer'),
  TransactionSerializer: Symbol.for('TransactionSerializer'),

  MainPageController: Symbol.for('MainPageController')
}
