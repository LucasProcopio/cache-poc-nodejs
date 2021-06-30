/**
 * @param {Object} container - dependecy injection
 * @param {import('src/app/services/example/listItemsService')} container.exampleService
 */
module.exports = ({ listItemsService }) => ({
    execute: async data => {
        return await listItemsService.execute(data);
    }
});
