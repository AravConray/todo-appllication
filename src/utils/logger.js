const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;
const logLevel = process.env.LOG_LEVEL || 'info';
const logFormat = printf((info) => {
  const { timestamp: ts, level, message, stack } = info;
  return `${ts} [${level}]: ${stack || message}`;
});
const logger = createLogger({
  level: logLevel,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
    }),
  ],
  exitOnError: false,
});
module.exports = logger;
