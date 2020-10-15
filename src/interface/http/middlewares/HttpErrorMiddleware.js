/**
    * @param {Object} container - Dependency Injection.
    * @param {import('src/infra/logging/logger')} container.logger
    * @param {import('../../../../config/index')} container.config
    * @param {import('src/interface/http/constants/HttpConstants')} container.httpConstants
    */
module.exports = ({ logger, config, httpConstants }) => (err, req, res, next) => {
    logger.error(err);
    const hasTrace = config.application.stack_erro_visible;

    const options = hasTrace ? { stack: err.stack } : '';

    const statusCode = err.statusCode || httpConstants.code.INTERNAL_SERVER_ERROR;

    const errorCustom = {
        message: err.message,
        statusCode,
        details: err.details || []
    };
    return res.status(statusCode).json(Object.assign(errorCustom, options));
};
