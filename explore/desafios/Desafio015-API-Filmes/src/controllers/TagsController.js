const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const user_id  = request.user.id;

        const tags = await knex("movie_tags").where("user_id", user_id)

        response.json(tags);
    }
}

module.exports = TagsController;