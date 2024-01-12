const NotesRepositoryInMemory = require("../repositories/NotesRepositoryInMemory");
const NoteCreateService = require("./NoteCreateService");

it("note should be create", async () => {
    const note = {
        title: "Teste de nota",
        description: "Descrição da nota",
        tags: ["Tag 1", "Tag 2"],
        links: ["Link 1", "Link 2"],
        user_id: "9"
    }

    const notesRepositoryInMemory = new NotesRepositoryInMemory();
    const noteCreateService = new NoteCreateService(notesRepositoryInMemory);

    const note_id = await noteCreateService.execute(note);
    expect(note_id).not.toBeUndefined();
})