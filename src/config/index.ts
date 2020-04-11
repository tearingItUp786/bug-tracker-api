import { merge } from 'lodash';
import { resolve } from 'path';
import { config } from 'dotenv';

// set up process to have env variables for donev.
config({ path: resolve(__dirname, '../../.env') });
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    port: process.env.PORT || 3000,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '100d',
    },
    dbUrl: process.env.DB_URL,
};

let envConfig = {};

switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config;
        break;
    case 'test':
    case 'testing':
        envConfig = require('./test').config;
        break;
    default:
        envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
