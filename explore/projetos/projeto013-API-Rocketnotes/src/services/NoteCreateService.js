class NoteCreateService {
    constructor(noteRepository){
        this.noteRepository = noteRepository;
    }

    async execute({title, description, tags, links, user_id}){
        const note_id = await this.noteRepository.insertNote({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await this.noteRepository.insertLinks(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });
        
        await this.noteRepository.insertTags(tagsInsert);

        return note_id;
    }
}

module.exports = NoteCreateService;