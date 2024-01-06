import { Container, Main, TagsContainer } from "./style";
import { Header } from "../../components/Header";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { TagItem } from "../../components/TagItem";
import { Button } from "../../components/Button";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddTag(){
        if (newTag == ""){
            return
        }

        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(tagDelete){
        setTags(prevState => prevState.filter(tag => tag !== tagDelete));
    }

    async function handleCreateNote(){
        if(newTag){
            return alert("Existe uma tag para adicionar!")
        }

        if(!title || !description || !rating || tags.length == 0){
            return alert("Preencha todos os campos!");
        }

        await api.post("/movies", {
            title,
            description,
            rating,
            tags
        })

        alert("Nota criada!");
        navigate(-1);
    }

    return (
        <Container>
            <Header
                name="Mayk Brito"
                src="https://github.com/maykbrito.png"
            />
            <Main>
                <div>
                    <Link title="Voltar" />
                    <h1>
                        Novo filme
                    </h1>
                </div>
                <fieldset>
                    <Input
                        placeholder="Título"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Sua nota (de 0 a 5)"
                        onChange={(e) => setRating(e.target.value)}
                    />
                </fieldset>
                <textarea placeholder="Observações"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TagsContainer>
                    <h2>Marcadores</h2>
                    <div>
                        {
                            tags &&
                            tags.map((tag, index) => (
                                <TagItem
                                    key={index}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            ))
                        }
                        <TagItem 
                            isNew
                            placeholder="Novo marcador"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                        />
                    </div>
                </TagsContainer>
                <div className="btnContainer">
                    <Button 
                        title="Excluir filme" 
                        alternate
                    />
                    <Button 
                        title="Salvar alterações"
                        onClick={handleCreateNote}
                    />
                </div>
            </Main>
        </Container>
    );
}