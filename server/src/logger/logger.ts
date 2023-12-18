import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

export const logger = createLogger({
  transports: [
    new transports.DailyRotateFile({
      dirname: "logs",
      filename: "api-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      maxSize: "20m",
      maxFiles: "1d",
      format: format.combine(format.json()),
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
  format: format.combine(
    format.metadata(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" })
  ),
});
