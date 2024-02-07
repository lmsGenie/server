import CONFIG from "@/configs";
import Stripe from "stripe";

const stripe = new Stripe(CONFIG.STRIPE.SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default stripe;
