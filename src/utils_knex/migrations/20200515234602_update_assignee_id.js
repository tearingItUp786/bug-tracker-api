exports.up = function (knex) {
    return knex.schema.table('issues', function (table) {
        table.integer('assignee_id').alter().unsigned().nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('issues', function (table) {
        table.dropColumn('assignee_id');
    });
};
