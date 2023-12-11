import CouponModel from "@/models/coupon.model";

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

export default {
  create,
  getAll,
  findOne,
};
