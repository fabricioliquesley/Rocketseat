import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { MovieCard } from "../../components/MovieCard";
import { Container, Main, CreateMovieButton, MovieCardsContainer } from "./style";
import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function openDetailNote(note_id){
        navigate(`/preview/${note_id}`);
    }

    useEffect(() => {
        async function fetchNotes(){
            try {
                const response = await api.get(`/movies?title=${search}`);

                setNotes(response.data);
            } catch (error) {
                console.error(error);
            }
            
        } 

        fetchNotes();
    }, [search])

    return (
        <Container>
            <Header 
                src="https://github.com/maykbrito.png"
                change={(e) => setSearch(e.target.value)}
            />
            <Main>
                <div>
                    <h1>Meus filmes</h1>
                    <CreateMovieButton
                        to="/create"
                    >
                        <FiPlus />
                        <p>
                            Adicionar filme
                        </p>
                    </CreateMovieButton>
                </div>
                <MovieCardsContainer>
                    {
                        notes &&
                        notes.map((note) => (
                            <MovieCard
                                key={String(note.id)}
                                movieData={note}
                                onClick={() => openDetailNote(note.id)}
                            />
                        ))
                    } 
                </MovieCardsContainer>
            </Main>
        </Container>
    );
}