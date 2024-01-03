const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const id  = request.user.id;

        // console.log(id)

        const tags = await knex("tags")
            .where({ user_id: id })
            .groupBy("name");

        return response.json(tags);
    }
}

module.exports = TagsController;