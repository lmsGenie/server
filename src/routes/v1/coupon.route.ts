import couponController from "@/controllers/v1/coupon.controller";
import { ROLES_LIST } from "@/enums";
import { Router } from "express";

import { authorizeRoles, isLoggedIn } from "@/middlewares/auth.middleware";

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

export default couponRoute;
