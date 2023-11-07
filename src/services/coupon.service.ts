import Coupon from "@/models/coupon.model";

const create = async (couponCode: string, discountPercentage: number) => {
  const coupon = await Coupon.create({
    couponCode,
    discountPercentage,
  });

  return coupon;
};

const getAll = async () => {
  const coupons = await Coupon.find({});

  return coupons;
};

export default {
  create,
  getAll,
};
