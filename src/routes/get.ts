import { FastifyInstance } from 'fastify'
import { container } from '../injector/container'
import { deps } from '../injector/deps'
import { MainPageController } from '../services'

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler (_request, reply) {
      return container.get<MainPageController>(deps.MainPageController).getIndex(reply)
    }
  })
}
