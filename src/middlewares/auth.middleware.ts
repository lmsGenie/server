import { ProtectedRequest } from "@/types/app-request";

import AppErr from "@/helpers/appErr";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import { IUser } from "@/models/user.model";
import tokenService from "@/services/token.service";
import userService from "@/services/user.service";
import HTTP_STATUS from "@/utils/httpStatus";

export const isLoggedIn = asyncHandler(
  async (req: ProtectedRequest, _res, next) => {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(
        new AppErr(
          "You are not authorized, please login",
          HTTP_STATUS.UNAUTHORIZED,
        ),
      );
    }

    const payload = await tokenService.verifyToken(token, "accessToken");

    if (!payload) {
      return next(
        new AppErr("Unauthorized, please login", HTTP_STATUS.UNAUTHORIZED),
      );
    }

    const id = (payload as IUser)._id;

    const user = await userService.getUserById(id);

    if (!user) {
      return next(new AppErr("User not found", HTTP_STATUS.UNAUTHORIZED));
    }

    req.user = user;

    next();
  },
);

export const authorizeRoles = (...roles: number[]) =>
  asyncHandler(async (req: ProtectedRequest, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppErr("You are not authorized to access this route", 403),
      );
    }

    next();
  });
