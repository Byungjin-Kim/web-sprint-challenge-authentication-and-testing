// Write your tests here

const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('users').truncate();
});
afterAll(async () => {
  await db.destroy();
});

// valid User Info.
const validUser = { username: "Captain Marvel", password: "1234" }



test('sanity', () => {
  expect(true).toBe(true)
});

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});

describe('[POST] /register', () => {
  it('resturns the newly created a user', async () => {
    const res = await request(server).post('/api/auth/register').send(validUser);
    expect(res.body.id).toBe(1);
    expect(res.body.username).toBe('Captain Marvel');
    expect(res.status).toBe(201);
  });
});

