const { Router } = require('express');
const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/operation/example/exampleOperation')} ctx.exampleOperation
 * @param {import('src/interface/http/schemas/exampleSchema')} ctx.exampleSchema
 */

module.exports = (ctx) => ({
    getDetails: async (req, res, next) => {
        try {
            const data = req.body;
            await ctx.exampleOperation.execute(data);
            return res.status(Status.OK).json({ ok:true });
        } catch (err) {
            next(err);
        }
    },

    get router() {
        return Router()
            .post('/details', ctx.validatorMiddleware(ctx.exampleSchema), this.getDetails);
    }
});
