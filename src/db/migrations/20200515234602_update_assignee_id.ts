import * as Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.table('issues', function (table) {
        table.integer('assignee_id').alter().unsigned().nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.table('issues', function (table) {
        table.dropColumn('assignee_id');
    });
}
