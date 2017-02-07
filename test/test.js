const assert = require("assert");
const request = require("supertest");

const app = require("../app");

describe("The Todo API", () => {
	it("Handles a GET request to /todos", done => {
		request(app)
			.get("/todos")
			.end((err, response) => {
				assert(response.body.todo === "Learn mongoDB");
				done();
			});
	});
});
