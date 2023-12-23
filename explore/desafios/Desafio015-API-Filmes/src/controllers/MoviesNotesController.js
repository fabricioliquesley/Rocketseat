const knex = require("../database/knex")

class MoviesNotesController {
    async create(request, response) {
        const { title, description, rating, tags_name } = request.body;
        const { user_id } = request.params;

        const [movie_note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags_name.map(tag_name => {
            return {
                movie_note_id,
                user_id,
                name: tag_name
            }
        })

        await knex("movie_tags").insert(tagsInsert);

        response.status(201).json();
    }
}

module.exports = MoviesNotesController;