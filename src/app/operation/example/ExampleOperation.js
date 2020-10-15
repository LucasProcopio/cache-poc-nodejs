/**
 * @param {Object} container - dependecy injection
 * @param {import('src/app/services/example/ExampleService')} container.exampleService
 */
module.exports = ({ exampleService }) => ({
    execute: async data => {
        return await exampleService.execute(data);
    }
});
