import { PAYMENT_STATUS } from "@/enums";
import { z } from "zod";

const orderBodySchema = z.object({
  courses: z.array(
    z.object({
      course: z
        .string({
          required_error: "Course ID is required",
          invalid_type_error: "Course ID must be a string",
        })
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
          message: "Course ID must be a valid MongoDB ObjectId",
        })
        .trim(),
      price: z.number({
        coerce: true,
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      }),
    }),
  ),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .max(15, {
      message: "Phone number cannot exceed 15 characters",
    }),
  currencyCode: z
    .string({
      required_error: "Currency code is required",
      invalid_type_error: "Currency code must be a string",
    })
    .trim()
    .min(3, {
      message: "Currency code must be at least 3 characters",
    })
    .max(3, {
      message: "Currency code cannot exceed 3 characters",
    }),
  subTotal: z.number({
    coerce: true,
    invalid_type_error: "Subtotal must be a number",
    required_error: "Subtotal is required",
  }),
  orderTotal: z.number({
    coerce: true,
    invalid_type_error: "Order total must be a number",
    required_error: "Order total is required",
  }),
  paymentMethod: z
    .string({
      invalid_type_error: "Payment method must be a string",
      required_error: "Payment method is required",
    })
    .trim()
    .min(3, {
      message: "Payment method must be at least 3 characters",
    }),
  paymentStatus: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]),
  coupon: z
    .string({
      required_error: "Coupon code is required",
      invalid_type_error: "Coupon code must be a string",
    })
    .trim()
    .min(6, {
      message: "Coupon code must be at least 6 characters",
    })
    .max(25, {
      message: "Coupon code cannot exceed 25 characters",
    })
    .optional(),
  transactionId: z
    .string({
      invalid_type_error: "Transaction ID must be a string",
    })
    .trim()
    .min(3, {
      message: "Transaction ID must be at least 3 characters",
    })
    .optional(),
  paymentResponse: z.unknown().optional(),
});

export const createOrderSchema = z.object({
  body: orderBodySchema,
});

export const updateOrderSchema = z.object({
  body: orderBodySchema.partial(),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>["body"];
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>["body"];
