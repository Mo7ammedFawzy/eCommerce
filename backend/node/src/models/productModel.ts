import {Document, model, Schema} from "mongoose";
import {Categories} from "../utils/constants/common";

interface Rating {
  rate: number,
  count: number
}

export interface IProduct extends Document {
  title: string,
  description?: string,
  price: number,
  category: Categories, //ELECTRONICS = "electronics", BOOKS = "books", CLOTHING = "clothing", HOME = "home", TOYS = "toys"
  discount?: number;
  colors?: string[];
  rating?: Rating;
  images: string[],
  stock: number,
  thumbnail: string,
  // shortDescription:string,
  // discountPrice:number,
  // currency: Currency, // USD|EGP
  // brand: string,
  // tags: string[],
  // sku: string,
  // rating: number, // 0 =>5
  // numReviews: number,
  // isFeatured: boolean, //for homepage highlights
  // isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {type: Number, default: 0}
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  }
}, {timestamps: true})


export const Product = model<IProduct>("Product", productSchema);