const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const movieNotesRoutes = require("./moviesNotes.routes")
const tagsRoutes = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/movies", movieNotesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;