exports.up = function (knex) {
    return knex.schema.createTable('user_projects', function (table) {
        table.increments();
        table.integer('project_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();

        table.foreign('project_id').references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_projects');
};
