const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/todos");

app.use(bodyParser.json());

module.exports = app;
