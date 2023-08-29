import { Router } from "express";

import validate from "@/middlewares/validate.middleware";
import authValidation from "@/validations/auth.validation";

const router = Router();

/**
 * @ROUTE {{URL}}/api/v1/auth
 */
router.route("/").post(validate(authValidation.loginUserSchema), loginUser);

/**
 * @ROUTE {{URL}}/api/v1/auth/new
 */
router
  .route("/new")
  .post(validate(authValidation.registerUserSchema), registerUser);
