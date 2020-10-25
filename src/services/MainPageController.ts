import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'inversify'
import { APIError, extractErrorData } from '../errors'
import { container } from '../injector/container'
import { deps } from '../injector/deps'
import { BlockService } from './BlockService'

interface TemplateMixin {
  errors: string[]
  input?: string
}

@injectable()
export class MainPageController {
  @inject(deps.BlockService) private blockService!: BlockService

  async getIndex (reply: FastifyReply) {
    return this.renderTemplate(reply, { errors: [] })
  }

  async createPost (request: FastifyRequest, reply: FastifyReply) {
    const mixin: TemplateMixin = { errors: [] }
    try {
      await this.blockService.create((request.body as any).content)
    } catch (e) {
      const data = extractErrorData(e)
      mixin.errors.push(data.message)
      mixin.input = (request.body as any).content
    }
    return this.renderTemplate(reply, mixin)
  }

  async mineBlock (request: FastifyRequest, reply: FastifyReply) {
    await this.blockService.mine((request.params as any).id)
    return reply.redirect('/')
  }

  protected async renderTemplate (reply: FastifyReply, mixin: TemplateMixin) {
    const service = container.get<BlockService>(deps.BlockService)

    const ctx = {
      blocks: await service.getPage(),
      ...mixin
    }

    return reply.view('src/templates/index.hbs', ctx)
  }
}
