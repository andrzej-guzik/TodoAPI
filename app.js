const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
	mongoose.connect("mongodb://localhost/todos");
}

app.use(bodyParser.json());

routes(app);

module.exports = app;
