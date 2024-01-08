import { Container, Main, MovieInfo, UserInfo, TagsContainer, Controls } from "./style";
import { Header } from "../../components/Header";
import { Link } from "../../components/Link";
import { RatingStar } from "../../components/Rating";
import { FiClock } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Tag } from "../../components/Tag";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

import { useAuth } from "../../hook/auth";

export function Preview() {
    const { user } = useAuth();
    const [data, setData] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    async function handleDeleteNote(){
        const confirm = window.confirm("Deseja mesmo excluir essa nota?");

        if(confirm){
            await api.delete(`/movies?user_id=${user.id}&movie_note_id=${params.id}`)
                .then(() => {
                    alert("Nota deletada!");
                    navigate(-1);
                })
                .catch((erro) => {
                    if(erro.response){
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

    return (
        <Container>
            <Header
                src="https://github.com/maykbrito.png"
            />
            <Main>
                <div>
                    <Controls>
                        <Link title="Voltar" />
                        <button onClick={handleDeleteNote}>
                            <FaRegTrashAlt />
                        </button>
                    </Controls>
                    <MovieInfo>
                        <h1>
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
                    <p>
                        {data.description}
                    </p>
                </article>
            </Main>
        </Container>
    );
}