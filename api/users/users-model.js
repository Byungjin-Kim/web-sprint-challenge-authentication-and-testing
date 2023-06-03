const db = require('../../data/dbConfig');

module.exports = {
    insert,
    findBy
};

async function insert(user) {
    const [id] = await db('users').insert(user);
    const newUser = await db('users').where('id', id).first();
    return newUser
}

async function findBy(filter) {
    return await db('users')
        .select('username')
        .where(filter)
}