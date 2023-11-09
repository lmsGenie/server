import express, { Router } from "express";

import authRoute from "./auth.route";
import courseRoute from "./course.route";

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
    path: "/courses",
    route: courseRoute,
  },
];

defaultRoutes.forEach((route: DefaultRoutes) => {
  routerV1.use(route.path, route.route);
});

export default routerV1;
