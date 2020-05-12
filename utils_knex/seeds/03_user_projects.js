exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user_projects')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('user_projects').insert([
                { id: 1, project_id: 1, user_id: 1 },
                { id: 2, project_id: 2, user_id: 2 },
            ]);
        });
};
