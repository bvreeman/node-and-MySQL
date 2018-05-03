DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ball', 'Outdoor Toy', 5, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tennis Racket', 'Outdoor Toy', 25, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Baseball Bat', 'Outdoor Toy', 30, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tent', 'Camping', 200, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sleeping Bag', 'Camping', 120, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lantern', 'Camping', 20, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Snowmobile', 'Vehicle', 3000, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Airplane', 'Vehicle', 200000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Four Wheeler', 'Vehicle', 2500, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Van', 'Vehicle', 25000, 8);