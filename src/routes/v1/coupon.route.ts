import { ROLES_LIST } from "@/enums";
import { Router } from "express";

import { authorizeRoles, isLoggedIn } from "@/middlewares/auth.middleware";
import HTTP_STATUS from "@/utils/httpStatus";

const couponRoute = Router();

/**
 * @ROUTE {{URL}}/api/v1/coupons
 */
couponRoute.get(
  "/",
  isLoggedIn,
  authorizeRoles(ROLES_LIST.ADMIN, ROLES_LIST.INSTRUCTOR, ROLES_LIST.ASSISTANT),
  (_req, res) => {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Coupons",
    });
  },
);

export default couponRoute;
