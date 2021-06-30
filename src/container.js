const awilix = require('awilix');
const container = awilix.createContainer();

const Config = require('../config');
const Application = require('src/app/Application');
const Exception = require('src/infra/error/Exception');
const Server = require('src/interface/http/Server');
const Router = require('src/interface/http/Router');
const Logger = require('src/infra/logging/logger');

container
    .register({
        config: awilix.asValue(Config),
        server: awilix.asClass(Server).singleton(),
        router: awilix.asFunction(Router).singleton(),
        application: awilix.asClass(Application).singleton(),
        exception: awilix.asFunction(Exception),
        logger: awilix.asFunction(Logger).singleton(),
        container: awilix.asValue(container),
    })
    .loadModules(
        [
            'src/app/operation/**/*.js',
            'src/app/services/**/*.js',
            'src/domain/factories/**/*.js',
            'src/domain/services/**/*.js',
            'src/domain/enum/**/*.js',
            'src/infra/integration/**/*.js',
            'src/interface/http/errors/**/*.js',
            'src/interface/http/constants/**/*.js',
            'src/interface/http/middlewares/**/*.js',
            'src/interface/http/controllers/**/*.js',
            'src/interface/http/schemas/**/*.js',
            'src/infra/repositories/*.js',
        ],
        {
            formatName: 'camelCase',
            resolverOptions: {
                injectionMode: awilix.InjectionMode.PROXY
            }
        }
    );

module.exports = container;
