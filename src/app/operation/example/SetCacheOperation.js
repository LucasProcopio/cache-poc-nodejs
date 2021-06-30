/**
 * @param {Object} container - dependecy injection
 * @param {import('src/app/services/example/listItemsService')} container.exampleService
 */
 module.exports = ({ setCacheService }) => ({
    execute: async data => {
        return setCacheService.execute(data);
    }
});
