const awilix = require('awilix');
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

container.loadModules(
  [
    'src/**/*.js',
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      injectionMode: awilix.InjectionMode.PROXY
    }
  });

module.exports = container;
