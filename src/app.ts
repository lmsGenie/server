import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

import CONFIG from "./configs";
import morganMiddleware from "./configs/morgan";
import requestInfo from "./middlewares/requestInfo";

const app = express();

// Middlewares
// Uncomment the following line if behind a load balancer or reverse proxy
// app.enable("trust proxy");
// Built-in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-party
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      CONFIG.CLIENT_URL,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(mongoSanitize());
// Custom
app.use(morganMiddleware);
if (CONFIG.NODE_ENV === "production") {
  // app.use(rateLimiter);
}

// Log all requests
app.use(requestInfo);

// All routes
// app.use(CONFIG.API_VERSION, router);

/**
 * @SERVER_STATUS
 * @ROUTE @GET {{URL}}/api/ping
 * @DESC Returns response 200 with message pong if api is working
 * @ACCESS Public
 */
app.get("/api/ping", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    message: "PONG",
  });
});

// CatchAll - 404 --- This should be after all the other routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
});

export default app;
