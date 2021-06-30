const { Router } = require('express');
const Status = require('http-status');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/operation/example/ListItemsOperation')} ctx.exampleOperation
 * @param {import('src/interface/http/schemas/listItemsSchema')} ctx.exampleSchema
 */

module.exports = (ctx) => ({
    list: async (req, res, next) => {
        try {
            const data = req.query;
            const result = await ctx.listItemsOperation.execute(data);
            return res.status(Status.OK).json(result);
        } catch (err) {
            next(err);
        }
    },

    get router() {
        return Router()
            .get('/', ctx.validatorMiddleware(ctx.listItemsSchema), this.list);
    }
});
