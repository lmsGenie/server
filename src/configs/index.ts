const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/lmsgenie",
  JWT: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "YOUR_SUPER_SECRET",
    ACCESS_TOKEN_EXPIRY_IN_MINS: parseInt(
      process.env.ACCESS_TOKEN_EXPIRY_IN_MINS || "360",
      10,
    ),
    REFRESH_TOKEN_SECRET:
      process.env.REFRESH_TOKEN_SECRET || "YOUR_SUPER_SECRET",
    REFRESH_TOKEN_EXPIRY_IN_DAYS: parseInt(
      process.env.REFRESH_TOKEN_EXPIRY_IN_DAYS || "7",
      10,
    ),
  },
  USER_VERIFICATION:
    process.env.USER_VERIFICATION_TOKEN_SECRET || "YOUR_SUPER_SECRET",
  EMAIL: {
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    EMAIL_FROM: process.env.SMTP_EMAIL_FROM || "",
  },
  VERIFY_URL: process.env.VERIFY_URL || "http://localhost:3000/verify-email",
};

export default CONFIG;
