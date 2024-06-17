const pool = require('../src/config/db');

const createTableUsers = async () => {
    try {
        await pool.query('drop table if exists users cascade');

        const query = `
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            password TEXT NOT NULL, 
            date_birth DATE,
            gender TEXT,
            avatar BYTEA,
            role TEXT,
            provider TEXT,
            phone_number TEXT,
            address TEXT,
            status TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableShops = async () => {
    try {
        await pool.query('drop table if exists shops cascade');

        const query = `
        CREATE TABLE shops (
            id TEXT PRIMARY KEY,
            shop_name TEXT,
            short_name TEXT,
            email TEXT,
            password TEXT,
            phone_number TEXT,
            avatar BYTEA    ,
            description TEXT,
            address TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableShopUsers = async () => {
    try {
        await pool.query('drop table if exists shop_users cascade');

        const query = `
        CREATE TABLE shop_users (
            id TEXT PRIMARY KEY,
            shop_id TEXT,
            user_id TEXT,
            role TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_shop_us_shop_id foreign key (shop_id) references shops(id),
            constraint fk_shop_us_user_id foreign key (user_id) references users(id)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(async () => {
    try {
        await createTableUsers();
        await createTableShops();
        await createTableShopUsers();
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
