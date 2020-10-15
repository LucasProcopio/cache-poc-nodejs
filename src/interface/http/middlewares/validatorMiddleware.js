const wrapperError = (error) => {
    return error.map(({
        message,
        path
    }) => ({
        message,
        path: path.join('.')
    }));
};

const validate = (req, schema) => schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
});

const filterReceivedBody = (req, value) => (req.body = value.body);

/**
  * @param {Object} container - Dependency Injection.
  * @param {import('src/infra/logging/logger')} container.logger
  */
module.exports = ({ logger }) => (schema) => {
    return (req, res, next) => {
        try {
            const { error, value } = validate(req, schema);

            if(error) {
                const err = new Error();
                err.status = err.status || 400;
                err.name = 'Validation';

                const message = {
                    title: err.name,
                    message: wrapperError(error.details),
                    received: req.body
                };

                logger.error({ message });

                delete message.received;

                return res.status(err.status).json(message);
            }
            filterReceivedBody(req, value);

            logger.info({
                'received_request': req.body
            });
            next();
        } catch (err) {
            next(err);
        }
    };
};
