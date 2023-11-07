import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import couponService from "@/services/coupon.service";

const generate = asyncHandler(async (req, res) => {
  const { couponCode, discountPercentage } = req.body;

  const coupon = await couponService.create(couponCode, discountPercentage);

  return commonResponse(res, "Coupon created successfully", coupon);
});

const getAll = asyncHandler(async (_req, res) => {
  const coupons = await couponService.getAll();

  return commonResponse(res, "Coupons fetched successfully", coupons);
});

export default {
  generate,
  getAll,
};
