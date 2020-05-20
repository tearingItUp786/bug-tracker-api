import config from '@config';
interface KnexConfig {
    [key: string]: object;
}

const knexConfig: KnexConfig = {
    development: {
        client: 'postgresql',
        connection: {
            ...config.db,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + '/utils_knex/migrations',
        },
        seeds: {
            directory: __dirname + '/utils_knex/seeds',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export = knexConfig;
