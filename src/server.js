require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const container = require('./app/container');

const appLogger = container.resolve('logger');

class App {
  constructor () {
    this.express = express();

    this.express.appLogger = appLogger;

    this.isDev = process.env.NODE_ENV !== 'production';

    this.exception();
    this.middlewares();
    this.logger();
    this.routes();
  }

  middlewares () {
    this.express.use(express.json());
  }

  logger () {
    this.express.use(morgan('combined', { stream: appLogger.stream }));
  }

  routes () {
    this.express.use(routes);
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      let title = 'Internal Server Error';

      if(err.name === 'Validation') title = 'Validation';

      return res.status(err.status || 500).json({ error: title, details:'err.message' });
    });
  }
}

module.exports = new App().express;
