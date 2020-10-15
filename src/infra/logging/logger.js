const winston = require('winston');
/**
    * @param {Object} container - Dependency Injection.
    * @param {import('../../../config/index')} container.config
    */
module.exports = ({ config }) => {
    const options = {
        levels: winston.config.syslog.levels,
        format: winston.format.json(),
        defaultMeta: { service: config.application.service_name },
        transports: [
            new winston.transports.Console({ format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(msg => {
                    const message = typeof msg.message === 'object' ? JSON.stringify(msg.message) : msg.message || msg[Symbol.for('message')];
                    return `${msg.timestamp} / ${msg.level}: ${message}`;
                })) }),
            new winston.transports.File({ filename: config.application.log_path })
        ]
    };

    const logger = winston.createLogger(options);

    logger.stream = {
        write: function(message, encoding){
            logger.info(message.substring(0, message.lastIndexOf('\n')));
        }
    };

    return logger;
};
