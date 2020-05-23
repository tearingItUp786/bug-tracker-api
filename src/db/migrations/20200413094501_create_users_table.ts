import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}
