import AppErr from "@/helpers/appErr";
import CouponModel from "@/models/coupon.model";
import { UpdateCouponSchema } from "@/validations/coupon.validation";

const create = async (
  couponCode: string,
  discountPercentage: number,
  isActive?: boolean,
) => {
  const coupon = await CouponModel.create({
    couponCode,
    discountPercentage,
    isActive,
  });

  return coupon;
};

const getAll = async () => {
  const coupons = await CouponModel.find({});

  return coupons;
};

const findOne = async (couponId: string) => {
  const coupon = await CouponModel.findById(couponId);

  return coupon;
};

const update = async (couponId: string, couponData: UpdateCouponSchema) => {
  const couponExists = await CouponModel.findById(couponId);

  if (!couponExists) {
    throw new AppErr("Coupon does not exist", 404);
  }

  const coupon = await CouponModel.findByIdAndUpdate(couponId, couponData, {
    new: true,
  });

  return coupon;
};

export default {
  create,
  getAll,
  findOne,
  update,
};
