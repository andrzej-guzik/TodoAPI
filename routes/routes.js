const todosController = require("../controllers/todos_controller");

module.exports = (app) => {

	app.get("/todos", todosController.findAll);
	app.post("/todos", todosController.create);
	app.put("/todos/:id", todosController.edit);
	app.delete("/todos/:id", todosController.delete);
};
