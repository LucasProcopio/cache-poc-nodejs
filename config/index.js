const { parsed } = require('dotenv').config();
const dot = require('dot-object');

const envToObj = env => {
    return dot.object(env);
};

const ENV = process.env.NODE_ENV;

const loadEnvironment = ({
    'DEV':
     require('./dev.json')
    ,
    'HOMOLOG':
    require('./homolog.json'),
    'PROD':
    envToObj(parsed)
});

module.exports  = loadEnvironment[ENV];
