import { Header } from "../../components/Header";
import { Container, Main } from "./style";

export function Home() {
    return (
        <Container>
            <Header/>
            <Main>
                <h1>Home</h1>
            </Main>
        </Container>
    );
}