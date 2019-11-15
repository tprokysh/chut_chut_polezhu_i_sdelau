CREATE TABLE formats (
id serial PRIMARY KEY,
format varchar(128) NOT NULL);

INSERT INTO formats(format) VALUES('VHS');
INSERT INTO formats(format) VALUES('DVD');
INSERT INTO formats(format) VALUES('Blu-Ray');

CREATE TABLE films (
id serial PRIMARY KEY,
title varchar(128) NOT NULL,
year int NOT NULL,
formatId int REFERENCES formats(id) NOT NULL,
authors varchar(255) NOT NULL)