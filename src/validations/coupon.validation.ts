import { z } from "zod";

export const couponSchema = z.object({
  body: z.object({
    couponCode: z
      .string({
        required_error: "Coupon code is required",
      })
      .min(6, {
        message: "Coupon code must be at least 6 characters",
      })
      .max(25, {
        message: "Coupon code cannot exceed 25 characters",
      })
      .trim(),
    discountPercentage: z.coerce // TODO: check if this works for string to number
      .number({
        required_error: "Discount percentage is required",
      })
      .min(1, {
        message: "Discount percentage must be atleast 1",
      })
      .max(100, {
        message: "Discount percentage cannot be more than 100",
      }),
  }),
});

export type CouponSchema = z.infer<typeof couponSchema>["body"];
