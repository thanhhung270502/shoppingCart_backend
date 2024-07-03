-- PRODUCTS TABLE --
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    shop_id TEXT,
    "name" TEXT,
    previous_price FLOAT,
    current_price FLOAT,
    "description" TEXT,
    "status" TEXT,
    product_image_id TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint fk_product_shop_id foreign key (shop_id) references shops(id)
);

-- CATEGORY TABLES --
CREATE TABLE category_1 (
    id      TEXT PRIMARY KEY,
    "name"  TEXT
);

CREATE TABLE category_2 (
    id              TEXT PRIMARY KEY,
    "name"          TEXT,
    category_1_id   TEXT,
    FOREIGN KEY (category_1_id) REFERENCES category_1(id)
);

CREATE TABLE category_3 (
    id              TEXT PRIMARY KEY,
    "name"          TEXT,
    category_2_id   TEXT,
    FOREIGN KEY (category_2_id) REFERENCES category_2(id)
);

CREATE TABLE category_4 (
    id              TEXT PRIMARY KEY,
    "name"          TEXT,
    category_3_id   TEXT,
    FOREIGN KEY (category_3_id) REFERENCES category_3(id)
);

CREATE TABLE category_5 (
    id              TEXT PRIMARY KEY,
    "name"          TEXT,
    category_4_id   TEXT,
    FOREIGN KEY (category_4_id) REFERENCES category_4(id)
);

-- PRODUCT - CATEGORY LINK TABLE --
CREATE TABLE product_category (
    id              TEXT PRIMARY KEY,
    product_id      TEXT,
    category_1_id   TEXT,
    category_2_id   TEXT,
    category_3_id   TEXT,
    category_4_id   TEXT,
    category_5_id   TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_1_id) REFERENCES category_1(id),
    FOREIGN KEY (category_2_id) REFERENCES category_2(id),
    FOREIGN KEY (category_3_id) REFERENCES category_3(id),
    FOREIGN KEY (category_4_id) REFERENCES category_4(id),
    FOREIGN KEY (category_5_id) REFERENCES category_5(id)
);

-- BOOKS TABLE --
CREATE TABLE books (
    id                          TEXT PRIMARY KEY, -- Product ID
    publishDate                 DATETIME,
    size                        TEXT,
    translator                  TEXT,
    coverType                   TEXT,
    pageCount                   TEXT,
    publisher                   TEXT,
    bookVersion                 TEXT,
    bookcare                    TEXT,
    deliveryMethod              TEXT,
    brand                       TEXT,
    origin                      TEXT,
    material                    TEXT,
    brandOrigin                 TEXT,
    warranty                    TEXT,
    warrantyType                TEXT,
    warrantyPeriod              TEXT,
    version                     TEXT,
    responsibleAddress          TEXT,
    responsibleUnit             TEXT,
    packaging                   TEXT,
    ageGroup                    TEXT,
    preservationInstructions    TEXT
);

-- BRANDS TABLE --
CREATE TABLE brands (
    id      TEXT PRIMARY KEY,
    "name"  TEXT
);

-- AUTHORS TABLE --
CREATE TABLE authors (
    id      TEXT PRIMARY KEY,
    "name"  TEXT
);

-- BOOK - BRANDS LINK TABLE --
CREATE TABLE book_brands (
    id          TEXT PRIMARY KEY,
    book_id     TEXT,
    brand_id    TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- AUTHOR - BRANDS LINK TABLE --
CREATE TABLE author_brands (
    id          TEXT PRIMARY KEY,
    author_id   TEXT,
    brand_id    TEXT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- PRODUCTS - BOOKS LINK TABLE --   
CREATE TABLE products_books (
    id TEXT PRIMARY KEY,
    product_id TEXT UNIQUE,
    book_id TEXT UNIQUE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- 
INSERT INTO category_1 (id, "name") VALUES ("01", "Nhà Sách");
INSERT INTO category_2 (id, category_1_id, name) VALUES ("001", "01", "Sách Tiếng Việt");
INSERT INTO category_2 (id, category_1_id, name) VALUES ("002", "01", "Quà lưu niệm");
INSERT INTO category_2 (id, category_1_id, name) VALUES ("003", "01", "Văn phòng phẩm");
INSERT INTO category_2 (id, category_1_id, name) VALUES ("004", "01", "English Books");
INSERT INTO category_3 (id, category_2_id, name) VALUES ("0001", "001", "Sách Kinh Tế");
INSERT INTO category_4 (id, category_3_id, name) VALUES ("00001", "0001", "Sách Tài Chính");
INSERT INTO category_5 (id, category_4_id, name) VALUES ("000001", "00001", "Vỡ lòng về tiền tệ - Money for Beginners");