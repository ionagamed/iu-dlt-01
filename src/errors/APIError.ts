export interface APIErrorSpec {
  code: string
  status: number
  message: string
}

export class APIError extends Error {
  constructor (public spec: APIErrorSpec) {
    super(spec.message)
  }
}
