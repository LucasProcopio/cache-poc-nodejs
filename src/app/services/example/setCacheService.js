/**
 * @param {Object} container - dependecy injection
 * @param {import('src/infra/integration/rest/exampleClient')} container.exampleClient
 * @param {import('src/domain/factories/exampleFactory')} container.exampleFactory
 */
 module.exports = ({ itemRepository, redisClient }) => ({
    execute: async data => {
        const { merchantId } = data;
        const items = await itemRepository.list(data);
        await redisClient.set(merchantId, items, 28800);
        return { status: 'success' };
    }
});
