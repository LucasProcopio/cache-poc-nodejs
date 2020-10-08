const express = require('express');
const handle = require('express-async-handler');

const routes = express.Router();
const container = require('./app/container');

/** Middlewares */
const validatorMiddleware = container.resolve('validatorMiddleware'); // require('./interface/http/middlewares/Validator');

/** Schemas */
const exampleSchema = container.resolve('exampleSchema'); // require('./interface/http/schemas/exampleSchema');

/** Controllers */
const exampleController = container.resolve('exampleController');

/** Routes */

/** Recipe  */
routes.get('/example', validatorMiddleware(exampleSchema), handle(exampleController.index));

/** Healthcheck */
routes.get('/healthcheck', (_, res) => res.json({ status: 'UP'}));

/**
 * Not Found
 */
routes.use('/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = routes;
