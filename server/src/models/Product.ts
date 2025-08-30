import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
});

export const Product = model<IProduct>("Product", ProductSchema);