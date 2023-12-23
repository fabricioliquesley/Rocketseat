const { Router } = require("express");

const MoviesNotesController = require("../controllers/MoviesNotesController")

const moviesNotesController = new MoviesNotesController();

const movieNotesRoutes = Router();

movieNotesRoutes.post("/:user_id", moviesNotesController.create)
movieNotesRoutes.get("/:note_id", moviesNotesController.show)

module.exports = movieNotesRoutes;