const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const checkUserExists = await knex("users").select().where("email", email)

        if (checkUserExists.length > 0) {
            throw new AppError("Este e-mail já está cadastrado.")
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password: hashedPassword
        })

        response.status(201).json();
    }
}

module.exports = UserController;