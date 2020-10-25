import { FastifyInstance } from 'fastify'
import { container } from '../injector/container'
import { deps } from '../injector/deps'
import { MainPageController } from '../services'

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/mine/:id',
    async handler (request, reply) {
      return container.get<MainPageController>(deps.MainPageController).mineBlock(request, reply)
    }
  })
}
