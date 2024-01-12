const knex = require("../database/knex");

class NotesRepository {
    async insertNote({ title, description, user_id }) {
        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        return note_id;
    }

    async insertLinks(links){
        await knex("links").insert(links);
    }

    async insertTags(tags){
        await knex("tags").insert(tags);
    }
}

module.exports = NotesRepository;