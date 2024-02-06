import CONFIG from "@/configs";
import Logger from "@/logger";
import { Request, Response } from "express";
import Stripe from "stripe";

import asyncHandler from "@/middlewares/asyncHandler.middleware";

// Stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const stripe = new Stripe(CONFIG.STRIPE.SECRET_KEY);

const webhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    // TODO: Complete stripe integration
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-unused-vars, @typescript-eslint/no-unused-vars
    event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    Logger.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
};

const createPaymentIntent = asyncHandler(
  async (req: Request, res: Response) => {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  },
);

export default {
  webhook,
  createPaymentIntent,
};
