import app from "./app";
import CONFIG from "./configs";
import connectToDB from "./configs/dbConn";
import Logger from "./logger";

// Handling uncaucght exceptions
process.on("uncaughtException", (err) => {
  Logger.error(`Error: ${err.message}`);
  Logger.info("Shutting down the server due to uncaught exceptions");

  process.exit(1);
});

const PORT = CONFIG.PORT || 5500;

const server = app.listen(PORT, async () => {
  try {
    await connectToDB();
    Logger.info(
      `App is listening at http://localhost:${PORT} in ${CONFIG.NODE_ENV} mode`,
    );
  } catch (error) {
    Logger.error(error);
  }
});

// log unhandled rejections
process.on("unhandledRejection", (err) => {
  Logger.error(err);
  Logger.info("Shutting down the server due to unhandled promise rejections");

  server.close(() => {
    process.exit(1);
  });
});
