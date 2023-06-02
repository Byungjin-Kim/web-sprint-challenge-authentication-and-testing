const db = require('../../data/dbConfig');

module.exports = {
    insert,
    findBy
};

async function insert(user) {
    const [id] = await db('users').insert(user);
    return db('users').where({ id }).first();
}

function findBy(filter) {
    return db("users")
        .select("username")
        .where(filter);
}