exports.up = function (knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.integer('issue_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('issue_id').references('id').inTable('issues').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
