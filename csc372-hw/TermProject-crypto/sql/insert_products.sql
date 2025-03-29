-- insert_products.sql
-- This file inserts a few sample products.

-- Note: Ensure that the categories inserted above exist.
INSERT INTO products (name, description, image_url, price, category_id, featured)
VALUES ('FOMO T-Shirt', 'Premium crypto-themed T-shirt.', 'images/FOMO_tee/Front.png', 24.99, 1, 1);

INSERT INTO products (name, description, image_url, price, category_id, featured)
VALUES ('Ethereum Hoodie', 'Stylish hoodie for crypto enthusiasts.', 'images/ETH_hoodie/Front.png', 39.99, 1, 0);


