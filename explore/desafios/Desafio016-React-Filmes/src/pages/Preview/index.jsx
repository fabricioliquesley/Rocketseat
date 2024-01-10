import { Container, Main, MovieInfo, UserInfo, TagsContainer, Controls } from "./style";
import { Header } from "../../components/Header";
import { Link } from "../../components/Link";
import { RatingStar } from "../../components/Rating";
import { FiClock } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

import { useAuth } from "../../hook/auth";


export function Preview() {
    const contentTitle = document.querySelector("#contentTitle");
    const contentDescription = document.querySelector("#contentDescription");
    
    const { user } = useAuth();
    const [data, setData] = useState({});
    
    const params = useParams();
    const navigate = useNavigate();
    
    const [note, setNote] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    async function updatedNote(){
        if(note.title == undefined){
            return
        }

        await api.put("/movies", {
            title: note.title,
            description: note.description,
            note_id: params.id
        })

        alert("Nota atualizada");
    }
    
    function saveChanges() {
        setNote({
            title: contentTitle.textContent.trim(),
            description: contentDescription.textContent.trim(),
        })
        
        contentTitle.removeAttribute("contenteditable");
        contentDescription.removeAttribute("contenteditable");
        
        setIsEditMode(false);
        updatedNote();
    }

    function handleEditNote() {
        contentTitle.setAttribute("contenteditable", true);
        contentTitle.focus();
        contentDescription.setAttribute("contenteditable", true);

        setIsEditMode(true);
    }

    async function handleDeleteNote() {
        const confirm = window.confirm("Deseja mesmo excluir essa nota?");

        if (confirm) {
            await api.delete(`/movies?user_id=${user.id}&movie_note_id=${params.id}`)
                .then(() => {
                    alert("Nota deletada!");
                    navigate(-1);
                })
                .catch((erro) => {
                    if (erro.response) {
                        alert(erro.response.data.message);
                    } else {
                        alert("Não foi possível excluir a nota!")
                    }
                })
        }
    }

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/movies/${params.id}`);

            setData(response.data);
        }

        fetchNotes();
    }, [])

    useEffect(() => {
        updatedNote();
    }, [note])

    return (
        <Container>
            <Header
                src="https://github.com/maykbrito.png"
            />
            <Main>
                <div>
                    <Controls>
                        <Link title="Voltar" />
                        <div>
                            <button onClick={handleEditNote}>
                                <FaPencil />
                            </button>
                            <button onClick={handleDeleteNote}>
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    </Controls>
                    <MovieInfo>
                        <h1 id="contentTitle">
                            {data.title}
                        </h1>
                        <RatingStar rating={data.rating} />
                    </MovieInfo>
                    <UserInfo>
                        <img src="https://github.com/maykbrito.png" />
                        <p>
                            {user.name}
                        </p>
                        <div>
                            <FiClock />
                            <span>30/12/23 às 08:00</span>
                        </div>
                    </UserInfo>
                </div>
                <TagsContainer>
                    {
                        data.tags &&
                        data.tags.map((tag) => (
                            <Tag
                                key={String(tag.id)}
                                alternate
                            >
                                {tag.name}
                            </Tag>
                        ))
                    }

                </TagsContainer>
                <article>
                    <span>Clique para editar</span>
                    <p id="contentDescription">
                        {data.description}
                    </p>
                </article>
                {isEditMode && <Button title="Salvar" onClick={saveChanges}/>}
            </Main>
        </Container>
    );
}