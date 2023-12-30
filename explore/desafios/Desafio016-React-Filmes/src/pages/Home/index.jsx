import { Header } from "../../components/Header";
import { Container, Main } from "./style";

export function Home() {
    return (
        <Container>
            <Header name="Mayk Brito" src="https://github.com/maykbrito.png"/>
            <Main>
                <h1>Home</h1>
            </Main>
        </Container>
    );
}