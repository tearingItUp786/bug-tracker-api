exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('projects')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('projects').insert([
                {
                    id: 1,
                    name: 'a project name',
                    url:
                        'https://static2.cbrimages.com/wordpress/wp-content/uploads/2019/10/My-Hero-Academia-All-Might-Header.jpg?q=50&fit=crop&w=960&h=500',
                },
                {
                    id: 2,
                    name: 'all might',
                    url:
                        'https://static2.cbrimages.com/wordpress/wp-content/uploads/2019/10/My-Hero-Academia-All-Might-Header.jpg?q=50&fit=crop&w=960&h=500',
                },
                {
                    id: 3,
                    name: 'all might 2',
                    url:
                        'https://static2.cbrimages.com/wordpress/wp-content/uploads/2019/10/My-Hero-Academia-All-Might-Header.jpg?q=50&fit=crop&w=960&h=500',
                },
            ]);
        });
};
