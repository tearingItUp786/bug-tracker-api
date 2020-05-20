import { merge } from 'lodash';
import './env';
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
    db: {
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'bt',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || null,
        port: Number(process.env.PGPORT) || 5432,
    },
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
