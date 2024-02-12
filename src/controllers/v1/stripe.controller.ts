import CONFIG from "@/configs";
import Logger from "@/logger";
import { Request, Response } from "express";
import Stripe from "stripe";

import { ProtectedRequest } from "@/types/app-request";

import commonResponse from "@/helpers/commonResponse";
import asyncHandler from "@/middlewares/asyncHandler.middleware";
import stripeService from "@/services/stripe.service";
import HTTP_STATUS from "@/utils/httpStatus";

const config = asyncHandler(async (req, res) => {
  const stripeConfig = stripeService.config();

  return commonResponse(
    res,
    "Stripe configuration",
    stripeConfig,
    HTTP_STATUS.OK,
  );
});

const webhook = async (req: Request, res: Response) => {
  const webhookSecret = CONFIG.STRIPE.WEBHOOK_SECRET;

  const stripe = new Stripe(CONFIG.STRIPE.SECRET_KEY);

  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    Logger.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "payment_intent.created") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent was successful!");
  }

  if (event.type === "payment_intent.canceled") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent was canceled!");
  }

  if (event.type === "payment_intent.payment_failed") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent payment failed!");
  }

  if (event.type === "payment_intent.processing") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent is processing!");
  }

  if (event.type === "payment_intent.requires_action") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent requires action!");
  }

  if (event.type === "payment_intent.succeeded") {
    // const paymentIntent = event.data.object;

    Logger.info("PaymentIntent succeeded!");
  }

  res.send();
};

const createPaymentIntent = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const paymentIntent = await stripeService.createPaymentIntent(req);

    return commonResponse(
      res,
      "Payment intent created",
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      HTTP_STATUS.CREATED,
    );
  },
);

export default {
  config,
  webhook,
  createPaymentIntent,
};
