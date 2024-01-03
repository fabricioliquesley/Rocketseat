import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Content, Note, Links, Tags } from "./style.js";
import { Header } from "../../components/Header/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Tag } from "../../components/Tag/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { ButtonNotBg } from "../../components/ButtonNotBg/index.jsx";
import { api } from "../../services/api.js";

export function Details() {
    const [data, setData] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    function handleBackHome() {
        navigate("/");
    }

    async function handleRemove() {
        const confirm = window.confirm("deseja realmente excluir a nota.")

        if (confirm){
            await api.delete(`/notes/${params.id}`);
            navigate("/");
        }

        return;
    }

    useEffect(() => {
        async function fetchNote() {
            const response = await api.get(`/notes/${params.id}`);
            setData(response.data);
        }

        fetchNote();
    }, [])

    return (
        <Container>
            <Header />
            {
                data &&
                <main>
                    <Content>
                        <ButtonNotBg
                            title="Excluir a nota"
                            isActive
                            onClick={handleRemove}
                        />
                        <Note>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </Note>
                        {
                            data.links.length !== 0 ?
                                <Section title="Links Úteis">
                                    <Links>
                                        {
                                            data.links.map((link) => (
                                                <li key={String(link.id)}>
                                                    <a
                                                        href={link.url}
                                                    >
                                                        {link.url}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </Links>
                                </Section>
                                : null
                        }

                        {
                            data.tags.length !== 0 ?
                                <Section title="Marcadores">
                                    <Tags>
                                        {
                                            data.tags.map((tag) => (
                                                <Tag
                                                    key={String(tag.id)}
                                                    title={tag.name}
                                                />
                                            ))
                                        }
                                    </Tags>
                                </Section>
                                : null
                        }
                        <Button
                            title="Voltar"
                            onClick={handleBackHome}
                        />
                    </Content>
                </main>
            }

        </Container>
    );
}