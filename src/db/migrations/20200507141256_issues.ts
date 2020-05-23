import * as Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('issues', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.text('description');
        table.enum('severity', ['CRITICAL', 'SEVERE', 'NORMAL', 'LOW'], {
            useNative: true,
            enumName: 'issue_severity ',
        });
        table.string('url');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('swim_lane_id').unsigned().notNullable();
        table.integer('reporter_id').unsigned().notNullable();
        table.integer('assignee_id').unsigned().notNullable();

        table.foreign('reporter_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('assignee_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('swim_lane_id').references('id').inTable('swim_lanes').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('issues');
}
