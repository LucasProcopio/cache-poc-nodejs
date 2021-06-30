const Joi = require('joi');

module.exports = () => Joi.object().keys({
    query: Joi.object().keys({
        merchantId: Joi.number().required(),
    })
});
