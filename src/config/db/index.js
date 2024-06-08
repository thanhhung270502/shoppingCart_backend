const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'polkadots',
    password: 'password',
    database: 'polkadots',
    port: 5433,
});

module.exports = pool;
