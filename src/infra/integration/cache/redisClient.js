const lodash = require('lodash');
const IORedis = require('ioredis');

/**
 * @param {Object} container - Dependency Injection.
 * @param {import('../../../../config')} container.config
 */
module.exports = ({ config }) => {
    const redisConfig = config.integration.sessionManager.redis;

    const redis = new IORedis(redisConfig);

    return {
        lib: () => redis,

        get: async (key) => {
            const value = await redis.get(key);
            return value ? JSON.parse(value) : null;
        },

        set: async (key, value, ttl = -1) => {
            const result = await redis.set(key, JSON.stringify(value));
            await redis.expire(key, ttl);
            return result;
        },

        getByKeyPattern: async (pattern) => {
            const keys = await redis.keys(pattern);
            const getByKeyPromises = keys.map(async (key) => redis.get(key));

            return Promise.allSettled(getByKeyPromises);
        },

        remove: async (keyPattern) => {
            const stream = redis.scanStream({ match: keyPattern });

            stream.on('data', (keys) => {
                if (lodash.get(keys, 'length', 0) > 0) {
                    const pipeline = redis.pipeline();

                    keys.forEach((key) => {
                        pipeline.del(key);
                    });

                    pipeline.exec();
                }
            });
        },
    };
};
