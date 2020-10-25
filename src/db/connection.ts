import * as mongoose from 'mongoose'
import { config } from '../config'

export async function connectDatabase () {
  return mongoose.connect(config.database.uri)
}
