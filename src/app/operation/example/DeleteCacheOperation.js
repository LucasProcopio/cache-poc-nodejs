/**
 * @param {Object} container - dependecy injection
 */
 module.exports = ({ removeCacheService }) => ({
    execute: async data => {
        return removeCacheService.execute(data);
    }
});
