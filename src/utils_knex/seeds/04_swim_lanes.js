exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('swim_lanes')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('swim_lanes').insert([
                { id: 1, name: 'swim lane 1', description: '', project_id: 1 },
                { id: 2, name: 'swim lane 23', description: '', project_id: 2 },
                { id: 3, name: 'swim lane 3', description: '', project_id: 2 },
                { id: 4, name: 'swim lane 4', description: '', project_id: 3 },
            ]);
        });
};
