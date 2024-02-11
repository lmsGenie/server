import stripe from "@/configs/stripe";
import Logger from "@/logger";
import Stripe from "stripe";

import { ProtectedRequest } from "@/types/app-request";

import AppErr from "@/helpers/appErr";
import { calculateTotalAmount } from "@/helpers/calcTotalAmount";
import HTTP_STATUS from "@/utils/httpStatus";

export const createPaymentIntent = async (req: ProtectedRequest) => {
  try {
    const { amount, currency, items, couponCode } = req.body;

    const totalAmount = await calculateTotalAmount(items, couponCode);

    if (totalAmount !== amount) {
      throw new AppErr("Amount mismatch", HTTP_STATUS.BAD_REQUEST);
    }

    const customer = await stripe.customers.list({
      email: req.user.email,
      limit: 1,
    });

    let customerId = "";

    if (!customer.data.length) {
      try {
        const createdCusomter = await stripe.customers.create({
          email: req.user.email,
          name: `${req.user.firstName} ${req.user.lastName}`,
        });

        customerId = createdCusomter.id;
      } catch (error) {
        Logger.error(error);
        throw new AppErr("Something went wrong, please try again", 500);
      }
    } else {
      customerId = customer.data[0].id;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency,
      customer: customerId,
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

export default {
  createPaymentIntent,
};
