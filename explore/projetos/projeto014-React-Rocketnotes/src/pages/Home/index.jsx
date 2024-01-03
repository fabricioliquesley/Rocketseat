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

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags");

            setTags(response.data);
        }

        fetchTags();
    }, [])

    return (
        <Container>
            <Header />
            <Menu>
                <div>
                    <h1>Rocketnotes</h1>
                    <nav>
                        <ButtonNotBg title="Todos" isActive />
                        {
                            tags &&
                            tags.map((tag) => (
                                <ButtonNotBg
                                    key={String(tag.id)}
                                    title={tag.name}
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
                <Input placeholder="Pesquisar pelo título" />
                <Section title="Minhas notas">
                    <Notes
                        data={{
                            name: "React Modal",
                            tags: [
                                { id: "1", name: "react" },
                                { id: "2", name: "css" },
                                { id: "3", name: "javascript" },
                            ]
                        }}
                    />
                    <Notes
                        data={{
                            name: "Exemplo de Middleware",
                            tags: [
                                { id: "1", name: "express" },
                                { id: "2", name: "node" },
                            ]
                        }}
                    />
                </Section>
            </Main>
        </Container>
    );
}