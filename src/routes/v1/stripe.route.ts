import stripeController from "@/controllers/v1/stripe.controller";
import { raw, Router } from "express";

import { isLoggedIn } from "@/middlewares/auth.middleware";

const stripeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/stripe
 */
stripeRouter
  .route("/webhook")
  .post(raw({ type: "application/json" }), stripeController.webhook);

stripeRouter
  .route("/create-payment-intent")
  .post(isLoggedIn, stripeController.createPaymentIntent);

export default stripeRouter;
