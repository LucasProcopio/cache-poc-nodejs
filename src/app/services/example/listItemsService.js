/**
 * @param {Object} container - dependecy injection
 * @param {import('src/infra/integration/rest/exampleClient')} container.exampleClient
 * @param {import('src/domain/factories/exampleFactory')} container.exampleFactory
 */
module.exports = ({ itemRepository }) => ({
    execute: async data => {
        return itemRepository.list(data);
    }
});
