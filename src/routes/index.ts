import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  fastify.register(require('./blocks').default, { prefix: '/blocks' })
  fastify.register(require('./testMineBlock').default, { prefix: '/testMineBlock' })

  fastify.register(require('./get').default)
  fastify.register(require('./create-post').default)
  fastify.register(require('./mine').default)
}
