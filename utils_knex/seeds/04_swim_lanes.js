exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('swim_lanes')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('swim_lanes').insert([
                { id: 1, name: '', description: '', project_id: 1 },
                { id: 2, name: '', description: '', project_id: 2 },
                { id: 3, name: '', description: '', project_id: 3 },
            ]);
        });
};
