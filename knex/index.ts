import config from '../knexfile';
import knex from 'knex';

const environment = process.env.ENVIRONMENT || 'development';

export const kx = knex(config[environment]);
