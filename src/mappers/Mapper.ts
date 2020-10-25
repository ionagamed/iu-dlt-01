export interface Mapper<D, T> {
  fromModel (instance: D): T
  toModel (entity: T): D
}
