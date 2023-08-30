import authController from "@/controllers/v1/auth.controller";
import { Router } from "express";

import validate from "@/middlewares/validate.middleware";
import authValidation from "@/validations/auth.validation";

const authRoute = Router();

/**
 * @ROUTE {{URL}}/api/v1/auth
 */
authRoute
  .route("/")
  .post(validate(authValidation.loginUserSchema), authController.login);

/**
 * @ROUTE {{URL}}/api/v1/auth/new
 */
authRoute
  .route("/new")
  .post(validate(authValidation.registerUserSchema), authController.register);

/**
 * @ROUTE {{URL}}/api/v1/auth/verify/:token
 */
authRoute.route("/verify/:token").get(authController.verify);

export default authRoute;
