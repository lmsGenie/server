import { COURSE_STATUS } from "@/enums";

import { ProtectedRequest } from "@/types/app-request";

import AppErr from "@/helpers/appErr";
import CourseModel from "@/models/course.model";
import OrderModel, { ICourses } from "@/models/order.model";
import HTTP_STATUS from "@/utils/httpStatus";

// FIXME: Payment Stripe
const create = async (req: ProtectedRequest) => {
  const {
    phoneNumber,
    subTotal,
    orderTotal,
    currencyCode,
    coupon,
    courses,
    paymentMethod,
    paymentToken,
    paymentStatus,
  } = req.body;

  const courseIds: string[] = courses.map((course: ICourses) => course.course);

  const courseExists = await CourseModel.find({
    _id: { $in: courseIds },
    status: COURSE_STATUS.ACTIVE,
  });

  if (courseExists.length !== courses.length) {
    throw new AppErr(
      "One or more courses are not available",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const order = new OrderModel({
    phoneNumber,
    subTotal,
    orderTotal,
    courses,
    paymentMethod,
    paymentToken,
    paymentStatus,
    currencyCode,
    user: req.user,
  });

  if (coupon) {
    order.coupon = coupon;
  }

  await order.save();
};

export default {
  create,
};
