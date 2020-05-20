exports.up = function (knex) {
    return knex.schema.table('comments', function (table) {
        table.text('description');
    });
};

exports.down = function (knex) {
    return knex.schema.table('comments', function (table) {
        table.dropColumn('description');
    });
};
