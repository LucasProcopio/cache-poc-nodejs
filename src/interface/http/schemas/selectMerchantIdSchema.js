const Joi = require('joi');

module.exports = () => Joi.object().keys({
    body: Joi.object().keys({
        merchantId: Joi.number().required(),
    })
});
