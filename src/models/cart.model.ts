import mongoose, { ObjectId } from "mongoose";

import CURRENCY_LIST from "@/utils/currency";

interface IProduct {
  productId: ObjectId;
  listPrice?: {
    price: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
  };
  discountedPrice?: {
    price: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
  };
  discountPercentage?: number;
  title: string;
  thumbnail?: {
    public_id: string;
    secure_url: string;
  };
}

export interface ICart extends Document {
  userId: ObjectId;
  products: IProduct[];
  cartTotal: number;
}

const cartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        listPrice: {
          price: Number,
          currencyName: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.name),
          },
          currencyCode: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.code),
          },
          currencySymbol: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.symbol),
          },
        },
        discountedPrice: {
          price: Number,
          currencyName: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.name),
          },
          currencyCode: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.code),
          },
          currencySymbol: {
            type: String,
            enum: CURRENCY_LIST.map((currency) => currency.symbol),
          },
        },
        discountPercentage: {
          type: Number,
          min: [1, "Course discount percentage must be atleast 1"],
          max: [100, "Course discount percentage cannot be greater than 100"],
        },
        thumbnail: {
          public_id: String,
          secure_url: String,
        },
        title: {
          type: String,
          required: [true, "Course title is required"],
          minlength: [2, "Course title must be atleast 2 characters long"],
          maxlength: [80, "Course title cannot be more than 80 characters"],
          trim: true,
        },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
