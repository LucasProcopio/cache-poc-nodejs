/**
    * @param {Object} container - Dependency Injection.
    * @param {import('src/infra/integration/rest/httpClient')} container.httpClient
    * @param {import('../../../../config/index')} container.config
    * @param {import('src/infra/logging/logger')} container.logger
    */
module.exports = ({ httpClient, config, logger }) => {
    const clientConfig = config.integration.rest.exampleExternalService;

    httpClient = httpClient({
        baseURL: clientConfig.baseURL,
        timeout: clientConfig.timeout
    });

    return {
        getDetails: async (data) => {
            // const result = await httpClient.get(`/api/details/${uuid}`);
            logger.info(`${clientConfig.externalCallMsg}, to get details`);
            return data;
        }
    };
};
