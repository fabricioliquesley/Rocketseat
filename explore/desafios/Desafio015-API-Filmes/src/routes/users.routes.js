const { Router } = require("express");

const UserController = require("../controllers/UserController");
const UserAvatarController = require("../controllers/userAvatarController");

const multer = require("multer");
const uploadConfig = require("../config/upload");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER);

const usersRoutes = Router();

usersRoutes.post("/", userController.create);
usersRoutes.put("/", userController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, userAvatarController.update)

module.exports = usersRoutes;