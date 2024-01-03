import { useState, useEffect } from "react";
import { Container, Menu, CreatBtn, Main } from "./style";
import { Header } from "../../components/Header";
import { ButtonNotBg } from "../../components/ButtonNotBg";
import { HiPlusSmall } from "react-icons/hi2";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Notes } from "../../components/Notes";

import { api } from "../../services/api";

export function Home() {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);

    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    function handleTagSelected(tagName) {
        if (tagName == "all"){
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName);
            
        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);

            setTagsSelected(filteredTags);
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");

            setTags(response.data);
        }

        fetchTags();
    }, [])

    useEffect(() => {
        console.log(notes)
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);

            setNotes(response.data);
        }
        
        fetchNotes();
    }, [tagsSelected, search])
    
    return (
        <Container>
            <Header />
            <Menu>
                <div>
                    <h1>Rocketnotes</h1>
                    <nav>
                        <ButtonNotBg
                            title="Todas"
                            isActive={tagsSelected.length === 0}
                            onClick={() => handleTagSelected("all")}
                        />
                        {
                            tags &&
                            tags.map((tag) => (
                                <ButtonNotBg
                                    key={String(tag.id)}
                                    title={tag.name}
                                    isActive={tagsSelected.includes(tag.name)}
                                    onClick={() => handleTagSelected(tag.name)}
                                />
                            ))
                        }
                    </nav>
                </div>
                <CreatBtn to="/createNotes">
                    <HiPlusSmall />
                    Criar nota
                </CreatBtn>
            </Menu>
            <Main>
                <Input 
                    placeholder="Pesquisar pelo título"
                    onChange={e => setSearch(e.target.value)}
                />
                <Section title="Minhas notas">
                    {
                        notes &&
                        notes.map((note) => (
                            <Notes
                                key={String(note.id)}
                                data={note}
                            />
                        ))
                    }
                </Section>
            </Main>
        </Container>
    );
}