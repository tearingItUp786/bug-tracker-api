exports.up = function (knex) {
    return knex.schema.createTable('issues', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.text('description');
        table.enu('severity', ['CRITICAL', 'SEVERE', 'NORMAL', 'LOW'], {
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
};

exports.down = function (knex) {
    return knex.schema.dropTable('issue');
};
