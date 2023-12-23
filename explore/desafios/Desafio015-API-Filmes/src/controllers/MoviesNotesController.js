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

    async show(request, response) {
        const { note_id } = request.params;

        const movie_note = await knex("movie_notes").where("id", note_id);

        const tags = await knex("movie_tags").where("movie_note_id", note_id).orderBy("name");

        response.json({
            ...movie_note,
            tags
        })
    }
}

module.exports = MoviesNotesController;