import { Container } from "./style";
import { useNavigate } from "react-router-dom";

export function NotFound(){
    const navigate = useNavigate();

    function handleBack(){
        navigate("/");
    }

    return(
        <Container>
            <h1>OPS! Página não encontrada</h1>
            <p>
                Você se perdeu durante a navegação.
                Mas fique tranquilo não é o fim.
            </p>
            <button
                type="button"
                onClick={handleBack}
            >
                Voltar ao inicio
            </button>
        </Container>
    );
}