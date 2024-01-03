import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Main, Content, Textarea } from "./style";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NotesItem";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

import { api } from "../../services/api";

export function CreateNotes() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink(){
        if(newLink == ""){
            return;
        }
        
        setLinks(prevState => [...prevState, newLink])
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag(){
        if(newTag == ""){
            return;
        }
        
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote(){
        if(newTag){
            return alert("Você deixou uma tag no campo para adicionar, mas não a adicionou.");
        }

        if(newLink){
            return alert("Você deixou uma link no campo para adicionar, mas não a adicionou.");
        }

        if(!title || !description || tags.length == 0 || links.length == 0){
            return alert("Preencha todos os campos para adicionar uma nota");
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        alert("Nota criada com sucesso.");
        navigate("/");
    }

    return (
        <Container>
            <Header />
            <Main>
                <Content>
                    <div>
                        <h2>Criar nota</h2>
                        <Link to="/">Voltar</Link>
                    </div>
                    <fieldset>
                        <Input 
                            placeholder="Título"
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Textarea 
                            placeholder="Observação" 
                            onChange={e => setDescription(e.target.value)}
                        />
                    </fieldset>
                    <Section title="Links úteis">
                        {
                            links &&
                            <ul>
                                {
                                    links.map((link, index) => (
                                        <NoteItem 
                                            key={String(index)}
                                            value={link}
                                            onClick={
                                                () => handleRemoveLink(link)
                                            }
                                        />
                                    ))
                                }
                            </ul>
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tagsContainer">
                            {
                                tags &&
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={
                                            () => handleRemoveTag(tag)
                                        }
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder="Novo marcador"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button 
                        title="Salvar"
                        onClick={handleNewNote} 
                    />
                </Content>
            </Main>
        </Container>
    );
}