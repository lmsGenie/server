import { Document, model, Schema } from "mongoose";

import CURRENCY_LIST from "@/utils/currency";

interface ICourses {
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
  orderStatus?: string;
  coupon?: Schema.Types.ObjectId;
  transactionId?: string;
}

const orderSchema = new Schema<IOrder>({
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
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
  orderStatus: {
    type: String,
    required: [true, "Order status is required"],
    enum: ["ORDERED", "PENDING", "REFUNDED"],
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  transactionId: String,
});

const OrderModel = model<IOrder>("Order", orderSchema);

export default OrderModel;
