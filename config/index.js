const { parsed } = require('dotenv').config();
const dot = require('dot-object');

const envToObj = env => {
    return dot.object(env);
};

const ENV = process.env.NODE_ENV;

const loadEnvironment = ({
    'dev':
     require('./dev.json')
    ,
    'homolog':
    require('./homolog.json')
    ,
    'production':
    envToObj(parsed)
});

module.exports  = loadEnvironment[ENV];
