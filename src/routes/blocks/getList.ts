import { FastifyInstance } from 'fastify'
import { Block } from '../../entities'
import { container } from '../../injector/container'
import { deps } from '../../injector/deps'
import { Repository } from '../../repositories'
import { BlockSerializer } from '../../serializers'

export default async function (fastify: FastifyInstance) {
  fastify.route<{ Querystring: any }>({
    method: 'GET',
    url: '/',
    async handler (request, reply) {
      request.query.limit = request.query.limit || 1000
      request.query.offset = request.query.offset || 0

      const serializer = container.get<BlockSerializer>(deps.BlockSerializer)

      const repo = container.get<Repository<Block>>(deps.BlockRepository)
      const results = await repo.findMany({}, request.query)
      results.items = results.items.map(serializer.serialize.bind(serializer))

      return reply.send(results)
    }
  })
}
