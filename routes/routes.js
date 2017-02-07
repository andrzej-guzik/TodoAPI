module.exports = (app) => {
	app.get("/todos", (req, res)=> {
		res.send({ todo: "Learn mongoDB"});
	});
};
