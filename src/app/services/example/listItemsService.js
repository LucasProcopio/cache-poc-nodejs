/**
 * @param {Object} container - dependecy injection
 * @param {import('src/infra/integration/rest/exampleClient')} container.exampleClient
 * @param {import('src/domain/factories/exampleFactory')} container.exampleFactory
 */
module.exports = ({ redisClient }) => ({
    execute: async (data) => {
        const { merchantId } = data;
        const redisItems = await redisClient.get(merchantId);
        return redisItems;
    }
});
