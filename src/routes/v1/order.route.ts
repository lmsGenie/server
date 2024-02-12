import orderController from "@/controllers/v1/order.controller";
import { Router } from "express";

import { isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validate.middleware";
import { createOrderSchema } from "@/validations/order.validation";

const orderRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/auth
 */
orderRouter
  .route("/")
  .post(isLoggedIn, validate(createOrderSchema), orderController.create);

export default orderRouter;
