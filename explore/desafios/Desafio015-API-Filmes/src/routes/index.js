const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./moviesNotes.routes")

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", movieNotesRoutes);

module.exports = routes;