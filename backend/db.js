const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  database: "films",
  password: "postgres",
  port: 5432
});

client.connect();

module.exports = client;
