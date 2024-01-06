import { Header } from "../../components/Header";
import { MovieCard } from "../../components/MovieCard";
import { Container, Main, CreateMovieButton, MovieCardsContainer } from "./style";
import { FiPlus } from "react-icons/fi";

export function Home() {
    return (
        <Container>
            <Header src="https://github.com/maykbrito.png" />
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
                    <MovieCard
                        movieData={{
                            name: "Interestellar",
                            rating: 4.5,
                            detail: "Pragas nas colheitas fizeram a civilização humana regredir para uma sociedade agrária em futuro de data desconhecida. Cooper, ex-piloto da NASA, tem uma fazenda com sua família. Murphy, a filha de dez anos de Cooper, acredita que seu quarto está assombrado por um fantasma que tenta se comunicar com ela. ",
                            tags: [
                                {
                                    id: "1",
                                    name: "Ficção Científica"
                                },
                                {
                                    id: "2",
                                    name: "Drama"
                                },
                                {
                                    id: "3",
                                    name: "Família"
                                },
                            ]
                        }}
                    />
                </MovieCardsContainer>
            </Main>
        </Container>
    );
}