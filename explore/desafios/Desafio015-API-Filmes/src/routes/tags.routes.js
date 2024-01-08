const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const tagsRoutes = Router();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;