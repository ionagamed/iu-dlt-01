import * as httpStatus from 'http-status'
import { APIError } from './APIError'

export const errors = {
  ENTITY_NOT_FOUND: (name: string, query: any) => new APIError({
    status: httpStatus.NOT_FOUND,
    code: 'ENTITY_NOT_FOUND',
    message: `Cannot find ${name} with ${JSON.stringify(query)}`
  }),
  PREVIOUS_BLOCK_NOT_VALID: () => new APIError({
    status: httpStatus.CONFLICT,
    code: 'PREVIOUS_BLOCK_NOT_VALID',
    message: 'Cannot add new block - previous block is not valid.'
  })
}
