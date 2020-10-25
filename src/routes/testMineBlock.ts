import { FastifyInstance } from 'fastify'
import { Block } from '../entities'
import { container } from '../injector/container'
import { deps } from '../injector/deps'
import { BlockMiner } from '../services'

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    async handler (request, reply) {
      const block = new Block({ ...(request.body as any) })
      const miner = container.get<BlockMiner>(deps.BlockMiner)
      const minedBlock = await miner.mine(block)
      return reply.send(minedBlock)
    }
  })
}
