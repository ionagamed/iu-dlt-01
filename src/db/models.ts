import { Schema, model } from 'mongoose'
import { nanoid } from 'nanoid'

const blockSchema = new Schema({
  _id: { type: String, default: () => nanoid(12) },
  nonce: { type: Number, required: true },
  hash: { type: String, required: true },
  content: { type: String, required: true },
  previousBlockHash: { type: String, required: true }
}, { timestamps: true })

export const BlockModel = model('Block', blockSchema)
