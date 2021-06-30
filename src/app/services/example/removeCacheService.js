/**
 * @param {Object} container - dependecy injection
 * @param {import('src/infra/integration/rest/exampleClient')} container.exampleClient
 * @param {import('src/domain/factories/exampleFactory')} container.exampleFactory
 */
 module.exports = ({ itemRepository, redisClient }) => ({
    execute: async data => {
        const { merchantId } = data;
        await redisClient.remove(merchantId);
        return { status: 'success' };
    }
});
