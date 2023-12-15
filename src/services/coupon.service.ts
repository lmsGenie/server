import Logger from "@/logger";

import AppErr from "@/helpers/appErr";
import CouponModel from "@/models/coupon.model";
import {
  getCouponQuerySchema,
  UpdateCouponSchema,
} from "@/validations/coupon.validation";

const create = async (
  couponCode: string,
  discountPercentage: number,
  isActive: boolean = true,
) => {
  try {
    const coupon = await CouponModel.create({
      couponCode,
      discountPercentage,
      isActive,
    });

    Logger.info(`Coupon ${coupon.couponCode} created successfully`);

    return coupon;
  } catch (error) {
    throw new AppErr("Failed to create coupon", 500);
  }
};

const findAll = async (queryObject: getCouponQuerySchema) => {
  const { queryObj, sortObj } = filterObject(queryObject);

  const limit = queryObject.limit || 50;
  const page = queryObject.page || 1;
  const skip = (page - 1) * limit;

  try {
    const totalCount = await CouponModel.countDocuments(queryObj);
    const totalPages = Math.ceil(totalCount / limit);

    const coupons = await CouponModel.find(queryObj)
      .sort(sortObj)
      .collation({ locale: "en" }) // Use collation for index-based sort
      .skip(skip)
      .limit(limit);

    return {
      coupons,
      currentPage: page,
      totalPages,
      totalItems: totalCount,
    };
  } catch (error) {
    throw new AppErr("Error occurred while finding coupons", 500);
  }
};

const findOne = async (couponId: string) => {
  const coupon = await CouponModel.findById(couponId);

  if (!coupon) {
    throw new AppErr("Coupon not found", 404);
  }

  Logger.info(`Coupon ${coupon.couponCode} fetched successfully`);

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

  Logger.info(`Coupon ${coupon?.couponCode} updated successfully`);

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

  Logger.info(`Coupon ${coupon?.couponCode} deleted successfully`);

  return coupon;
};

const filterObject = (object: getCouponQuerySchema) => {
  const { fromDate, toDate, search, sortBy, order } = object;

  const queryObj: Record<string, unknown> = {};
  const sortObj: { [key: string]: "asc" | "desc" } = {};

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
