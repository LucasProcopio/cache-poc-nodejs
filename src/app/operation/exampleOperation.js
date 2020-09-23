module.exports = ({ exampleService, exampleService2, logger }) => ({
  execute: async data => {

    const make = exampleService.execute(data);

    const transform = exampleService2.execute(make);

    logger.info('Log from exampleOperation');

    return transform;
  }
});
