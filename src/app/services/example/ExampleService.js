/**
 * @param {Object} container - dependecy injection
 * @param {import('src/infra/integration/rest/exampleClient')} container.exampleClient
 * @param {import('src/domain/factories/exampleFactory')} container.exampleFactory
 */
module.exports = ({ exampleClient, exampleFactory }) => ({
    execute: async data => {
        const result = await exampleClient.getDetails(data);

        return exampleFactory.buildPayload(result);
    }
});
