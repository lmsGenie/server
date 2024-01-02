import { PAYMENT_STATUS } from "@/enums";
import { Document, model, Schema } from "mongoose";

import CURRENCY_LIST from "@/utils/currency";

export interface ICourses {
  course: Schema.Types.ObjectId;
  price: number;
}

export interface IOrder extends Document {
  courses: ICourses[];
  user: Schema.Types.ObjectId;
  phoneNumber: string;
  currencyCode: string;
  subTotal: number;
  orderTotal: number;
  paymentMethod: string;
  paymentStatus?: PAYMENT_STATUS;
  coupon?: Schema.Types.ObjectId;
  transactionId?: string;
  paymentResponse?: unknown;
}

const orderSchema = new Schema<IOrder>(
  {
    courses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be at least 10 characters"],
      maxlength: [15, "Phone number cannot be more than 10 characters"],
      trim: true,
    },
    currencyCode: {
      type: String,
      enum: CURRENCY_LIST.map((currency) => currency.code),
      required: [true, "Currency code is required"],
    },
    subTotal: {
      type: Number,
      required: [true, "Order sub total is required"],
    },
    orderTotal: {
      type: Number,
      required: [true, "Order toal is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      enum: Object.values(PAYMENT_STATUS),
    },
    paymentResponse: {
      type: Object,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    transactionId: String,
  },
  {
    timestamps: true,
  },
);

const OrderModel = model<IOrder>("Order", orderSchema);

export default OrderModel;
