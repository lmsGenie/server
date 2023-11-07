import express, { Router } from "express";

import authRoute from "./auth.route";
import couponRoute from "./coupon.route";

const routerV1: Router = express.Router();

interface DefaultRoutes {
  path: string;
  route: Router;
}

const defaultRoutes: DefaultRoutes[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/coupons",
    route: couponRoute,
  },
];

defaultRoutes.forEach((route: DefaultRoutes) => {
  routerV1.use(route.path, route.route);
});

export default routerV1;
