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
            avatar_url TEXT,
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

const createTableUserAddresses = async () => {
    try {
        await pool.query('drop table if exists user_addresses cascade');

        const query = `
        CREATE TABLE user_addresses (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            name TEXT,
            phone_number TEXT,
            province_code TEXT,
            district_code TEXT,
            ward_code TEXT,
            address_detail TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_uas_user_id foreign key (user_id) references users(id),
            constraint fk_uas_province_code foreign key (province_code) references provinces(code),
            constraint fk_uas_district_code foreign key (district_code) references districts(code),
            constraint fk_uas_ward_code foreign key (ward_code) references wards(code)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableUserAddress = async () => {
    try {
        await pool.query('drop table if exists user_address cascade');

        const query = `
        CREATE TABLE user_address (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            address_id TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_ua_user_id foreign key (user_id) references users(id),
            constraint fk_ua_address_id foreign key (address_id) references user_addresses(id)
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
            name TEXT,
            short_name TEXT,
            email TEXT,
            password TEXT,
            phone_number TEXT,
            avatar BYTEA    ,
            description TEXT,
            province_code TEXT,
            district_code TEXT,
            ward_code TEXT,
            address_detail TEXT,
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

const createTableProducts = async () => {
    try {
        await pool.query('drop table if exists products cascade');

        const query = `
        CREATE TABLE products (
            id TEXT PRIMARY KEY,
            shop_id TEXT,
            name TEXT,
            previous_price FLOAT,
            current_price FLOAT,
            description TEXT,
            status TEXT,
            product_image_id TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_product_shop_id foreign key (shop_id) references shops(id)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableProductImages = async () => {
    try {
        await pool.query('drop table if exists product_images cascade');

        const query = `
        CREATE TABLE product_images (
            id TEXT PRIMARY KEY,
            product_id TEXT,
            image BYTEA,
            image_url TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_pi_product_id foreign key (product_id) references products(id)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableShopTopics = async () => {
    try {
        await pool.query('drop table if exists shop_topics cascade');

        const query = `
        CREATE TABLE shop_topics (
            id TEXT PRIMARY KEY,
            shop_id TEXT,
            index integer,
            topic_name TEXT,
            status TEXT,
            edit_by_user_id TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_st_shop_id foreign key (shop_id) references shops(id),
            constraint fk_st_user_id foreign key (edit_by_user_id) references users(id)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableTopicBg = async () => {
    try {
        await pool.query('drop table if exists topic_bg cascade');

        const query = `
        CREATE TABLE topic_bg (
            id TEXT PRIMARY KEY,
            shop_topics_id TEXT,
            image BYTEA,
            image_url TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_tb_shop_topics_id foreign key (shop_topics_id) references shop_topics(id)
        );`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
const createTableTopicItems = async () => {
    try {
        await pool.query('drop table if exists topic_items cascade');

        const query = `
        CREATE TABLE topic_items (
            id TEXT PRIMARY KEY,
            shop_topics_id TEXT,
            product_id TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            constraint fk_tb_shop_topics_id foreign key (shop_topics_id) references shop_topics(id),
            constraint fk_tb_product_id foreign key (product_id) references products(id)
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
        await createTableUserAddresses();
        await createTableUserAddress();
        await createTableProducts();
        await createTableProductImages();
        await createTableShopTopics();
        await createTableTopicBg();
        await createTableTopicItems();

        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
