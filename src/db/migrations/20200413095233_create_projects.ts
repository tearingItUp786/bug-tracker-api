import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('projects', function (table) {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('url');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('projects');
}
