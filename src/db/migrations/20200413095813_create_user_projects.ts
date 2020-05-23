import * as Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user_projects', function (table) {
        table.increments();
        table.integer('project_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();

        table.foreign('project_id').references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user_projects');
}
