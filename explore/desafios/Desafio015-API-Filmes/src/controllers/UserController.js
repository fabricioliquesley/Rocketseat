const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

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

    async update(request, response) {
        const { name, email, password, oldPassword } = request.body;
        const { id } = request.params;

        const user = await knex("users").select().where("id", id);

        if (user.length == 0) {
            throw new AppError("Usuário não encontrado");
        }

        if (email){
            const userWithUpdatedEmail = await knex("users").select().where("email", email);

            if (userWithUpdatedEmail.length > 0 && userWithUpdatedEmail[0].id !== user[0].id) {
                throw new AppError("Este e-mail já está em uso.");
            }
        }

        user[0].name = name ?? user[0].name;
        user[0].email = email ?? user[0].email;

        console.log([user[0].name, user[0].email])

        if (password && oldPassword) {
            const checkPassword = await compare(oldPassword, user[0].password);

            if (!checkPassword) {
                throw new AppError("A senha antiga não é igual a cadastrada.");
            }

            user[0].password = await hash(password, 8);
        }

        console.log([user[0].password])

        await knex("users").update({
            name: user[0].name,
            email: user[0].email,
            password: user[0].password,
            updated_at: knex.fn.now()
        }).where("id", id)

        response.status(201).json();
    }
}

module.exports = UserController;