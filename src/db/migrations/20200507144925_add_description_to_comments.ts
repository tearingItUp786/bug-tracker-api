import * as Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.table('comments', function (table) {
        table.text('description');
    });
}

export async function down(knex: Knex) {
    return knex.schema.table('comments', function (table) {
        table.dropColumn('description');
    });
}
