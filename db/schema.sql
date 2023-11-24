-- db/schema.sql
DROP DATABASE IF EXISTS journals_dev;
CREATE DATABASE journals_dev;

\c journals_dev;

CREATE TABLE journals (
 id SERIAL PRIMARY KEY,
 date DATE DEFAULT CURRENT_DATE,
 time TIME DEFAULT CURRENT_TIME,
 author TEXT,
 content TEXT NOT NULL
);