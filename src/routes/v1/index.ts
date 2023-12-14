import express, { Router } from "express";

import authRouter from "./auth.route";
import couponRouter from "./coupon.route";

const routerV1: Router = express.Router();

interface DefaultRoutes {
  path: string;
  route: Router;
}

/**
 * Route: /api/v1/
 */
const defaultRoutes: DefaultRoutes[] = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/coupons",
    route: couponRouter,
  },
];

defaultRoutes.forEach((route: DefaultRoutes) => {
  routerV1.use(route.path, route.route);
});

export default routerV1;
