class NoteCreateService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({title, description, tags, links, user_id}){
        const note_id = await this.userRepository.insertNote({
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

        await this.userRepository.insertLinks(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });

        await this.userRepository.insertTags(tagsInsert);
    }
}

module.exports = NoteCreateService;