const winston = require('winston');
const path = require('path');

const logPath = path.join(process.env.SERVER_LOGS_PATH, 'access.log');

module.exports = () => {
  const options = {
    levels: winston.config.syslog.levels,
    format: winston.format.json(),
    defaultMeta: { service: 'connector' },
    transports: [
      new winston.transports.Console({ format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(msg => {
          const message = typeof msg.message === 'object' ? JSON.stringify(msg.message) : msg.message || msg[Symbol.for('message')];
          return `${msg.timestamp} / ${msg.level}: ${message}`;
        })) }),
      new winston.transports.File({ filename: logPath })
    ]
  };

  const logger = winston.createLogger(options);

  logger.stream = {
    write: function(message, encoding){
      logger.info(message);
    }
  };

  return logger;
};
