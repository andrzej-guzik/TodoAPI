const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Todo = mongoose.model("todo");

describe("Todos controller", () => {

	it("GET to /todos returns all todos", done => {
		const todos = Todo.insertMany([{ todo: "Learn NodeJs" }, { todo: "Learn MongoDB" }]);

		request(app)
			.get("/todos")
			.end((err, response) => {
				assert(response.body.todos.length === 2);
				assert(response.body.todos[0].todo === "Learn NodeJs");
				done();
			});
	});

	it("POST to /todos creates a new todo", done => {
		Todo.count().then(count => {
			request(app)
				.post("/todos")
				.send({ todo: "Learn MongoDB" })
				.end(() => {
					Todo.count().then(newCount => {
						assert(count + 1 === newCount);
						done();
					});
				});
		});
	});

	it("PUT to /todos/:id updates a todo", done => {
		const todo = new Todo({ todo: "Learn React" });

		todo.save().then(() => {
			request(app)
				.put(`/todos/${todo._id}`)
				.send({ finished: true })
				.end(() => {
					Todo.findOne({ todo: "Learn React" })
						.then(todo => {
							assert(todo.finished === true);
							done();
						});
					});
		});
	});

	it("DELETE to /todos/:id can delete an existing todo", done => {
		const todo = new Todo({ todo: "Learn VueJs" });

		todo.save().then(() => {
			request(app)
				.delete(`/todos/${todo._id}`)
				.end(() => {
					Todo.findById(todo._id)
						.then(todo => {
							assert(todo === null);
							done();
						});
				});
			});
	});
});
