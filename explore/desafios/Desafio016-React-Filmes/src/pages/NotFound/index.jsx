import { Container } from "./style";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <Container>
            <h1><span>OPS!</span> Não encontramos o que procura.</h1>
            <p>
                Parece perigoso tentar desbravar essa area,
                <Link to="/">
                    volte para um local segura.
                </Link>
            </p>
        </Container>
    );
}