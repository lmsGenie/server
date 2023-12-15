import Logger from "@/logger";
import mongoose from "mongoose";

import CONFIG from ".";

mongoose.set("strictQuery", false); // To prepare for future mongoose change
mongoose.set("runValidators", true); // To run mongoose Schema validations upon update

const connectToDB = async (
  MONGO_URI = CONFIG.MONGO_URI || "mongodb://localhost:27017/lmsgenie",
) => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    if (conn) {
      Logger.info(`Connected to DB: ${conn.connection.host}`);
    }
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

export default connectToDB;
