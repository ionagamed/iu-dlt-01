import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import * as httpStatus from 'http-status'
import { APIError, APIErrorSpec } from './APIError'

export function extractErrorData (error: Error) {
  let spec: APIErrorSpec & { stack?: string }
  if (error instanceof APIError) {
    spec = {
      ...error.spec,
      stack: error.stack
    }
  } else {
    spec = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
      stack: error.stack
    }
  }
  return spec
}

async function errorHandler (error: Error, request: FastifyRequest, reply: FastifyReply) {
  const spec = extractErrorData(error)
  return reply.status(spec.status).send(spec)
}

export function bindErrorHandler (fastify: FastifyInstance) {
  fastify.setErrorHandler(errorHandler)
}
