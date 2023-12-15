import couponController from "@/controllers/v1/coupon.controller";
import { ROLES_LIST } from "@/enums";
import { Router } from "express";

import { authorizeRoles, isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validate.middleware";
import {
  couponIdParamSchema,
  createCouponSchema,
  getCouponSchema,
  updateCouponSchema,
} from "@/validations/coupon.validation";

const couponRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/coupons
 */
couponRouter.get(
  "/",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(getCouponSchema),
  couponController.getAll,
);

couponRouter.post(
  "/",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(createCouponSchema),
  couponController.create,
);

couponRouter.get(
  "/:couponId",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(couponIdParamSchema),
  couponController.findOne,
);

couponRouter.patch(
  "/:couponId",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(updateCouponSchema),
  couponController.update,
);

couponRouter.delete(
  "/:couponId",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR),
  validate(couponIdParamSchema),
  couponController.remove,
);

export default couponRouter;
