const superTest = require('supertest');
const server = require('./api/server');
const db = require('./database/dbConfig');

beforeEach(async () => {
	await db.seed.run();
});


test('login', async () => {
    const res = await superTest(server).post('/api/auth/login')
    .send({ username: 'Ramy', password: 'Ramy123' })
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe('application/json');
});

test('register', async () => {
    const res = await superTest(server).post('/api/auth/register')
    .send({ username: 'sss', password: 'abc123' })
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe('application/json');
});



