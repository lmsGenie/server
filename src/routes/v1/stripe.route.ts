import stripeController from "@/controllers/v1/stripe.controller";
import { Router } from "express";

import { isLoggedIn } from "@/middlewares/auth.middleware";

const stripeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/stripe
 */
stripeRouter.get("/config", stripeController.config);

stripeRouter
  .route("/create-payment-intent")
  .post(isLoggedIn, stripeController.createPaymentIntent);

export default stripeRouter;
