const express = require('express');
const handle = require('express-async-handler');
const compression = require('compression');

const DefaultRouter = express.Router();
const ApiRouter = express.Router();

/**
 * @param {Object} ctx - Dependency Injection.
 * @param {import('./middlewares/ValidatorMiddleware')} ctx.validatorMiddleware
 * @param {import('src/interface/http/controllers/example/ItemController')} ctx.exampleController
 * @param {import('src/interface/http/middlewares/swaggerMiddleware')} ctx.httpErrorMiddleware
 * @param {import('src/interface/http/middlewares/HttpErrorMiddleware')} ctx.httpErrorMiddleware
 */
module.exports = (ctx) => {

    DefaultRouter
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(compression());


    ApiRouter.use('/docs', ctx.swaggerMiddleware);

    DefaultRouter.use('/api', ApiRouter);

    ApiRouter.use('/orders', handle(ctx.itemController.router));

    DefaultRouter.get('/healthcheck', (_, res) => res.json({ status: 'UP' }));

    DefaultRouter.use('/*', (req, res, next) => next(ctx.exception.notFound()));

    DefaultRouter.use(ctx.httpErrorMiddleware);

    return DefaultRouter;
};
