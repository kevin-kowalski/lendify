import { Schema, model } from 'mongoose';
import { IItem } from '../_types';

const itemSchema = new Schema<IItem>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // user._id
  name: { type: String, required: true },
  photo: { type: String }, // URL to cloudinary link
  value: { type: Number },
  description: { type: String, required: true },
  lendable: { type: Boolean },
  available: { type: Boolean },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  borrowed: { type: Boolean }
}, { timestamps: true });

// remove unique index on the user field
itemSchema.index({ user: 1 }, { unique: false })

// Create model from schema
export const Item = model<IItem>('Item', itemSchema);
