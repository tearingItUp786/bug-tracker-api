import * as Knex from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function () {
            // Inserts seed entries
            const password = bcrypt.hashSync('test', 8);
            return knex('users').insert([
                { id: 1, email: 'test1@test.com', first_name: 'Test', last_name: 'testy', password },
                { id: 2, email: 'test2@test.com', first_name: 'Test', last_name: 'testy', password },
                { id: 3, email: 'test3@test.com', first_name: 'Test', last_name: 'testy', password },
            ]);
        });
}
