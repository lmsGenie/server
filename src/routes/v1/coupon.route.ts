import couponController from "@/controllers/v1/coupon.controller";
import { ROLES_LIST } from "@/enums";
import { Router } from "express";

import { authorizeRoles, isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validate.middleware";
import {
  createCouponSchema,
  updateCouponSchema,
} from "@/validations/coupon.validation";

const couponRoute = Router();

/**
 * @ROUTE {{URL}}/api/v1/coupons
 */
couponRoute.get(
  "/",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  couponController.getAll,
);

couponRoute.post(
  "/",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(createCouponSchema),
  couponController.create,
);

couponRoute.get(
  "/:couponId",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  couponController.findOne,
);

couponRoute.patch(
  "/:couponId",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(updateCouponSchema),
  couponController.update,
);

export default couponRoute;
