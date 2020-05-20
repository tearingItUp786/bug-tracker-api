exports.up = function (knex) {
    return knex.schema.createTable('swim_lanes', function (table) {
        table.increments();
        table.string('name');
        table.text('description');
        table.integer('project_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.foreign('project_id').references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('swim_lanes');
};
