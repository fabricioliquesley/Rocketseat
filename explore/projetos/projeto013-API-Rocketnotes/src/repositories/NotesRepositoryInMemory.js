class NotesRepositoryInMemory {
    notes = [];
    tags = [];
    links = [];

    async insertNote({ title, description, user_id }){
        const note = {
            id: Math.floor(Math.random() * 1000) + 1,
            title,
            description,
            user_id
        }

        this.notes.push(note);

        return note.id;
    }

    async insertLinks(linksInsert){
        this.links.push(linksInsert);
    }

    async insertTags(tagsInsert){
        this.tags.push(tagsInsert);
    }
}

module.exports = NotesRepositoryInMemory;