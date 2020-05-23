import * as Knex from 'knex';
export async function seed(knex: Knex) {
    // Deletes ALL existing entries
    return knex('comments')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('comments').insert([
                {
                    id: 1,
                    description: 'what is good',
                    user_id: 1,
                    issue_id: 1,
                },
            ]);
        });
}
