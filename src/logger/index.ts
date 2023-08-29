import winston from "winston";

import "winston-daily-rotate-file";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms A" }),
  winston.format.prettyPrint(),
  // winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/all-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
});

const transports = [
  fileRotateTransport,
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      }),
    ),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports,
  format,
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/exceptions.log",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "logs/rejections.log",
    }),
  ],
});

export default Logger;
