import CONFIG from "@/configs";
import stripe from "@/configs/stripe";
import Logger from "@/logger";
import Stripe from "stripe";

import { ProtectedRequest } from "@/types/app-request";

import AppErr from "@/helpers/appErr";
import { calculateTotalAmount } from "@/helpers/calcTotalAmount";
import HTTP_STATUS from "@/utils/httpStatus";

const config = () => {
  if (CONFIG.STRIPE.PUBLISHABLE_KEY) {
    return {
      publishableKey: CONFIG.STRIPE.PUBLISHABLE_KEY,
    };
  } else {
    throw new AppErr(
      "Stripe publishable key not found",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

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
        throw new AppErr(
          "Something went wrong, please try again",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      customerId = customer.data[0].id;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    try {
      const paymentConfirm = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {
          payment_method: "pm_card_visa",
          return_url: "http://shivamvijaywargi.dev",
        },
      );

      return paymentConfirm;
    } catch (error) {
      Logger.error(error);
      throw new AppErr(
        "Something went wrong, please try again",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  } catch (error) {
    Logger.error(error);
    if (error instanceof Stripe.errors.StripeError) {
      throw new AppErr(
        error.message,
        error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }

    throw new AppErr(
      "Something went wrong at Stripe's end",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

export default {
  config,
  createPaymentIntent,
};
