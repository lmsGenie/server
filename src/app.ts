import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

import CONFIG from "./configs";
import morganMiddleware from "./configs/morgan";
import errorMiddleware from "./middlewares/error.middleware";
import requestInfo from "./middlewares/requestInfo.middleware";
import routerV1 from "./routes/v1";
import HTTP_STATUS from "./utils/httpStatus";

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
    optionsSuccessStatus: HTTP_STATUS.OK,
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
app.use("/api/v1", routerV1);

/**
 * @SERVER_STATUS
 * @ROUTE @GET {{URL}}/api/ping
 * @DESC Returns response 200 with message pong if api is working
 * @ACCESS Public
 */
app.get("/api/ping", (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    status: "UP",
    message: "PONG",
  });
});

// Below is only test route, will be removed after testing
// app.post("/upload", async (_req: Request, res: Response) => {
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//     folder: "lmsgenie-data/profiles",
//     public_id: "user1",
//   };

//   try {
//     const result = await uploadImage("upload/COLLEGE_ID.jpeg", options);

//     res.send({
//       success: true,
//       result: result,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: "Something went wrong, please try again",
//     });
//   }
// });

// CatchAll - 404 --- This should be after all the other routes
app.all("*", (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
});

// Custom error middleware (⚠️ should always be the last middleware)
app.use(errorMiddleware);

export default app;
