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
// invalid User Info.
const invalidUser1 = { username: "Ken", password: "" }
const invalidUser2 = { username: "", password: "4321" }


test('sanity check', () => {
  expect(true).not.toBe(false);
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
  it('responds with proper status and message if a client tries to register without password', async () => {
    let res = await request(server).post('/api/auth/register').send(invalidUser1);
    expect(res.body.message).toMatch(/username and password required/i);
    expect(res.status).toBe(400);
  });
  it('responds with proper status and message if a client tries to register without username', async () => {
    let res = await request(server).post('/api/auth/register').send(invalidUser2);
    expect(res.body.message).toMatch(/username and password required/i);
    expect(res.status).toBe(400);
  });
})

describe('[GET] /api/jokes', () => {
  it('requests without a token are bounced with proper status and message', async () => {
    const res = await request(server).get('/api/jokes');
    expect(res.body.message).toMatch(/token required/i);
  }, 750);
});
