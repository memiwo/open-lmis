DROP TABLE IF EXISTS product_categories;
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE ,
  name VARCHAR(100) NOT NULL UNIQUE,
  modifiedDate TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
  modifiedBy INTEGER
);
