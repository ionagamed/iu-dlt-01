import Fastify from 'fastify'
import FastifyFormBody from 'fastify-formbody'
import * as handlebars from 'handlebars'
import PointOfView from 'point-of-view'
import 'reflect-metadata'
import { config } from './config'
import { connectDatabase } from './db/connection'
import { bindErrorHandler } from './errors'
import { container } from './injector/container'
import { deps } from './injector/deps'
import { GenesisBlockGenerator } from './services'

async function run () {
  const fastify = Fastify({ logger: { level: 'debug' } })

  await connectDatabase()
  await container.get<GenesisBlockGenerator>(deps.GenesisBlockGenerator).ensureGenesisBlock()

  bindErrorHandler(fastify)
  fastify.register(FastifyFormBody)
  fastify.register(PointOfView, { engine: { handlebars } })
  fastify.register(require('./routes').default)
  fastify.listen(config.listenPort, (err) => {
    if (err) {
      fastify.log.error(err)
    } else {
      fastify.log.debug('Opened the port')
    }
  })
}

run()
