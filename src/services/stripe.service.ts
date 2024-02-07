import stripe from "@/configs/stripe";
import Logger from "@/logger";
import Stripe from "stripe";

import AppErr from "@/helpers/appErr";

export const createPaymentIntent = async (amount: number, currency: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent;
  } catch (error) {
    Logger.error(error);
    if (error instanceof Stripe.errors.StripeError) {
      throw new AppErr(error.message, error.statusCode ?? 500);
    }

    throw new AppErr("Something went wrong at Stripe's end", 500);
  }
};
