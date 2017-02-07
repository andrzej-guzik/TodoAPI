const {ObjectID} = require("mongodb");
const Todo = require("../models/todo");

module.exports = {

	findAll(req, res, next) {
		Todo.find()
			.then(todos => res.send({ todos }))
			.catch(next);
	},

	create(req, res, next) {
		const todoProps = req.body;

		Todo.create(todoProps)
			.then(todo => res.send(todo))
			.catch(next);
	},

	edit(req, res, next) {
		const todoId = req.params.id;
		const todoProps = req.body;

		if(!ObjectID.isValid(todoId))
			return res.status(404).send();

		Todo.findByIdAndUpdate({ _id: todoId }, todoProps)
			.then(() => Todo.findById({ _id: todoId }))
			.then(todo => res.send(todo))
			.catch(next);
	},

	delete(req, res, next) {
		const todoId = req.params.id;

		if(!ObjectID.isValid(todoId))
			return res.status(404).send();

		Todo.findByIdAndRemove({ _id: todoId })
			.then(todo => res.send(todo))
			.catch(next);
	}
};
