import { model, Schema } from "mongoose";

export interface ICoupon extends Document {
  couponCode: string;
  discountPercentage: number;
}

const couponSchema = new Schema<ICoupon>({
  couponCode: {
    type: String,
    required: [true, "Coupon code is required"],
    minlength: [6, "Coupon code must be at least 6 characters"],
    maxlength: [25, "Coupon code cannot exceed 25 characters"],
    uppercase: true,
    trim: true,
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount percentage is required"],
    min: [0, "Discount percentage must be atleast 0"],
    max: [100, "Discount percentage cannot be more than 100"],
  },
});

const Coupon = model<ICoupon>("Coupon", couponSchema);

export default Coupon;
