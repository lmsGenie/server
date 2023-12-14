import AppErr from "@/helpers/appErr";
import CouponModel from "@/models/coupon.model";
import {
  getCouponQuerySchema,
  UpdateCouponSchema,
} from "@/validations/coupon.validation";

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

const findAll = async (queryObject: getCouponQuerySchema) => {
  const { queryObj, sortObj } = filterObject(queryObject);

  const limit = queryObject.limit || 50;
  const page = queryObject.page || 1;
  const skip = (page - 1) * limit;

  const coupons = await CouponModel.find(queryObj)
    .sort(sortObj)
    .skip(skip)
    .limit(limit);

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

const remove = async (couponId: string) => {
  const couponExists = await CouponModel.findById(couponId);

  if (!couponExists) {
    throw new AppErr("Coupon does not exist", 404);
  }

  const coupon = await CouponModel.findByIdAndDelete(couponId, {
    new: true,
  });

  return coupon;
};

const filterObject = (object: getCouponQuerySchema) => {
  const { fromDate, toDate, search, sortBy, order } = object;

  const queryObj: Record<string, unknown> = {};

  if (fromDate && toDate) {
    if (fromDate > toDate) {
      throw new AppErr("fromDate cannot be greater than toDate", 400);
    }

    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      queryObj[sortBy] = { $gte: fromDate, $lt: toDate };
    } else {
      queryObj.createdAt = { $gte: fromDate, $lt: toDate };
    }
  }

  if (search) {
    queryObj.couponCode = { $regex: search, $options: "i" };
  }

  const sortObj: { [key: string]: "asc" | "desc" } = {};

  if (sortBy) {
    sortObj[sortBy] = order || "desc";
  }

  return { queryObj, sortObj };
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
