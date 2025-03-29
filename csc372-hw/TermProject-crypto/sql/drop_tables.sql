-- drop_tables.sql
-- This file drops the tables for the FOMO online store in the correct order.

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS cartproducts;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
