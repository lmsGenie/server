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
  const filteredObject = filterObject(queryObject);

  const limit = queryObject.limit ? queryObject.limit : 50;
  const page = queryObject.page ? queryObject.page : 1;
  const skip = (page - 1) * limit;

  const coupons = await CouponModel.find(filteredObject)
    .sort(queryObject.order ? queryObject.order : "desc")
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
  const { fromDate, toDate, search, sortBy } = object;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let queryObj: any;

  if (fromDate && toDate) {
    if (fromDate < toDate) {
      throw new AppErr("fromDate cannot be less than toDate", 400);
    }

    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      queryObj[sortBy] = { $gte: fromDate, $lt: toDate };
    } else {
      queryObj.createdAt = { $gte: fromDate, $lt: toDate };
    }
  }

  // if (sortBy) {
  //   queryObj[sortBy] = order ? order : "desc";
  // }

  if (search) {
    queryObj = dbQuery(queryObj, "$or", [
      {
        couponCode: { $regex: search, $options: "i" },
      },
    ]);
  }

  console.log(JSON.stringify(queryObj, null, 2));

  // queryObj = dbQuery(queryObj);

  return queryObj;
};

const dbQuery = (
  queryObject: getCouponQuerySchema,
  key: string,
  value: unknown,
) => {
  if (value !== undefined && value !== null) {
    return { ...queryObject, [key]: value };
  }
  return queryObject;
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
