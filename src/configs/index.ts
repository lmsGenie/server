const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/lmsgenie",
};

export default CONFIG;
