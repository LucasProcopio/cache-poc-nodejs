const Enum = require('src/domain/enum/Enum');

/**
 * @param {Object} container - dependecy injection
 */
module.exports = () => Enum({
    DEV: 'develop',
    HOMOLOG: 'homolog',
    PRODUCTION: 'production',
});
