const request = require('supertest');

const app = require('../src/app');

describe('User TestCases', () => {
    let user_id;

    test('get-all-users', async () => {
        const response = await request(app).get('/users').send().expect(200);
    });

    // test('create-new-user', async () => {
    //     const response = await request(app)
    //         .post('/users')
    //         .send({
    //             name: 'Thanh Hung',
    //             phone_number: '0923123123',
    //             password: '123456',
    //         })
    //         .expect(201);
    //     user_id = response.body.id;
    // });

    // test('delete-user', async () => {
    //     const response = await request(app)
    //         .delete('/users')
    //         .send({
    //             name: 'Thanh Hung',
    //             phone_number: '0923123123',
    //             password: '123456',
    //         })
    //         .expect(201);
    //     user_id = response.body.id;
    // });
});
