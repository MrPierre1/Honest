"use strict";
var DBPool = require("pg").Pool;
var db = new DBPool({
    user: "jpierrelouis",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432
});
module.exports = db;
