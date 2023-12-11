import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import couponService from "@/services/coupon.service";

const create = asyncHandler(async (req, res) => {
  const { couponCode, discountPercentage, isActive } = req.body;

  const coupon = await couponService.create(
    couponCode,
    discountPercentage,
    isActive,
  );

  return commonResponse(res, "Coupon created successfully", coupon);
});

const getAll = asyncHandler(async (_req, res) => {
  const coupons = await couponService.getAll();

  return commonResponse(res, "Coupons fetched successfully", coupons);
});

const findOne = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await couponService.findOne(couponId);

  return commonResponse(res, "Coupon fetched successfully", coupon);
});

const update = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await couponService.update(couponId, req.body);

  return commonResponse(res, "Coupon updated successfully", coupon);
});

export default {
  create,
  getAll,
  findOne,
  update,
};
