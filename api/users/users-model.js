const db = require('../../data/dbConfig');

module.exports = {
    insert,
    findBy
};

async function insert(user) {
    const [id] = await db('users').insert(user);
    return db('users').where({ id }).first();
}

async function findBy(filter) {
    return await db("users")
        .select("username", "password")
        .where(filter);
}