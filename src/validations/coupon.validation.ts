import { z } from "zod";

export const couponBodySchema = z.object({
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
  discountPercentage: z.coerce
    .number({
      required_error: "Discount percentage is required",
    })
    .min(1, {
      message: "Discount percentage must be atleast 1",
    })
    .max(100, {
      message: "Discount percentage cannot be more than 100",
    }),
  isActive: z.boolean({ coerce: true }).optional(),
});

export const couponParamsSchema = z.object({
  couponId: z.string().regex(/(ObjectId\(')?[0-9a-fA-F]{24}('\))?/g, {
    message: "Invalid Coupon Id",
  }),
});

export const couponQuerySchema = z.object({
  search: z.string().optional(),
  fromDate: z.date({ coerce: true }).optional(),
  toDate: z.date({ coerce: true }).optional(),
  sortBy: z
    .enum(["couponCode", "discountPercentage", "createdAt", "updatedAt"])
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number({ coerce: true }).optional(),
  limit: z.number({ coerce: true }).optional(),
});

export const getCouponSchema = z.object({
  query: couponQuerySchema,
});

export const createCouponSchema = z.object({
  body: couponBodySchema,
});

export const updateCouponSchema = z.object({
  body: couponBodySchema.partial(),
  params: couponParamsSchema,
});

export const deleteCouponSchema = z.object({
  params: couponParamsSchema,
});

export type CreateCouponSchema = z.infer<typeof createCouponSchema>["body"];
export type UpdateCouponSchema = z.infer<typeof updateCouponSchema>["body"];
export type getCouponQuerySchema = z.infer<typeof getCouponSchema>["query"];
