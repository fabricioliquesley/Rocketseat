const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesNotesController {
    async create(request, response) {
        const { title, description, rating, tags_name } = request.body;
        const user_id = request.user.id;

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

        const movie_note = await knex("movie_notes").where("id", note_id).first();

        const tags = await knex("movie_tags").where("movie_note_id", note_id).orderBy("name");

        response.status(201).json({
            ...movie_note,
            tags
        })
    }

    async index(request, response) {
        const { title, tags } = request.query;
        const user_id = request.user.id;

        let movie_notes;

        if (tags) {
            const filterTags = tags.split(",").map(tag => tag.trim());

            if (!title) {
                movie_notes = await knex("movie_tags")
                    .select([
                        "movie_notes.id",
                        "movie_notes.title",
                        "movie_notes.description",
                        "movie_notes.user_id",
                    ])
                    .where("movie_notes.user_id", user_id)
                    .whereIn("name", filterTags)
                    .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
            } else {
                movie_notes = await knex("movie_tags")
                    .select([
                        "movie_notes.id",
                        "movie_notes.title",
                        "movie_notes.description",
                        "movie_notes.user_id",
                    ])
                    .where("movie_notes.user_id", user_id)
                    .whereLike("movie_notes.title", `%${title}%`)
                    .whereIn("name", filterTags)
                    .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
            }
        } else {
            if (title) {
                movie_notes = await knex("movie_notes")
                    .where({ user_id })
                    .whereLike("title", `%${title}%`)
                    .orderBy("title");
            } else {
                movie_notes = await knex("movie_notes")
                    .where({ user_id })
                    .orderBy("title");
            }
        }

        const userTags = await knex("movie_tags").where({ user_id });

        const movieNoteWithTags = movie_notes.map(note => {
            const noteTags = userTags.filter(tag => tag.movie_note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });

        response.status(201).json(movieNoteWithTags)
    }

    async delete(request, response) {
        const { user_id, movie_note_id } = request.query;

        if (!user_id || !movie_note_id) {
            throw new AppError("Informe o id do usuário e o id da anotação.");
        }

        const [userExists] = await knex("users")
            .where("id", user_id)
        
        if (!userExists) {
            throw new AppError("Usuário não encontrado");
        }

        const [user] = await knex("movie_notes")
            .select("user_id").where("id", movie_note_id);

        if (user.user_id != user_id) {
            throw new AppError("Essa anotação não pertence a esse usuário.");
        }

        await knex("movie_notes")
            .where("id", movie_note_id)
            .where("user_id", user_id)
            .delete();
    

        response.status(201).json();
    }
}

module.exports = MoviesNotesController;