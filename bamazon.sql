
DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

Select *
FROM products;

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (001, "jordan_1", "basketball", 150.99, 4),
    (002, "jordan_2", "basketball", 150.99, 5),
    (003, "jordan_3", "basketball", 150.99, 3),
    (004, "jordan_4", "basketball", 150.99, 1),
    (005, "jordan_5", "basketball", 150.99, 6),
    (006, "jordan_6", "basketball", 150.99, 9),
    (007, "jordan_7", "baseball", 150.99, 3),
    (008, "jordan_8", "basketball", 150.99, 10),
    (009, "jordan_9", "basketball", 150.99, 9),
    (0010, "jordan_10", "basketball", 150.99, 4) 
