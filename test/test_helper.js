const mongoose = require("mongoose");

before(done => {
	mongoose.connect("mongodb://localhost/todos-test");
	mongoose.connection
		.once("open", () => done())
		.on("error", err => {
			console.warn("Warning: ", error);
		});
});
