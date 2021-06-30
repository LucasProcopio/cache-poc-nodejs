const Joi = require('joi');

module.exports = () => Joi.object().keys({
    query: Joi.object().keys({
        i: Joi.alternatives().try(Joi.array().max(3).items(Joi.string()), Joi.string())
    })
});
