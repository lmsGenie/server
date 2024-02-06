import stripeController from "@/controllers/v1/stripe.controller";
import { raw, Router } from "express";

const stripeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/stripe
 */
stripeRouter
  .route("/webhook")
  .post(raw({ type: "application/json" }), stripeController.webhook);

stripeRouter
  .route("/create-payment-intent")
  .post(stripeController.createPaymentIntent);

export default stripeRouter;
