exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('issues')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('issues').insert([
                {
                    id: 1,
                    name: 'foo bar',
                    description: 'Some desc',
                    severity: 'CRITICAL',
                    url: 'http://taranveerbains.ca',
                    swim_lane_id: 1,
                    reporter_id: 1,
                    assignee_id: 1,
                },
                {
                    id: 2,
                    name: 'foo bar',
                    description: 'Some desc',
                    severity: 'CRITICAL',
                    url: 'http://taranveerbains.ca',
                    swim_lane_id: 2,
                    reporter_id: 2,
                    assignee_id: 2,
                },
            ]);
        });
};
