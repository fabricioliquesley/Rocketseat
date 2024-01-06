const { Router } = require("express");

const MoviesNotesController = require("../controllers/MoviesNotesController")

const moviesNotesController = new MoviesNotesController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const movieNotesRoutes = Router();
movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.post("/:user_id", moviesNotesController.create);
movieNotesRoutes.get("/:note_id", moviesNotesController.show);
movieNotesRoutes.get("/", moviesNotesController.index);
movieNotesRoutes.delete("/", moviesNotesController.delete);

module.exports = movieNotesRoutes;