exports.up = function (knex, Promise) {
    return knex.schema.createTable('projects', function (table) {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('url');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('projects');
};
