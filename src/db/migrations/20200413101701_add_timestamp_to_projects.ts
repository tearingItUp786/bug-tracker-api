import * as Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.table('projects', function (table) {
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.table('projects', function (table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
    });
}
