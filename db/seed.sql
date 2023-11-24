-- db/seed.sql

\c journals_dev;

INSERT INTO journals (id, date, time, author, content)
VALUES
  (1, '11/23/2023', '9:23:24 AM', '🙃', 'What Ice Spice said ?'),
  (2, '11/23/2023', '4:03:12 AM', 'fswd', 'this is a test for static site');