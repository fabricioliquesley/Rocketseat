import { Container, Title } from "./style";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export function Form({ title, children, buttonName, src, linkName, isRegister = false }) {
    return (
        <Container>
            <Title>
                <h1>RocketMovies</h1>
                <span>
                    Aplicação para acompanhar tudo que assistir.
                </span>
            </Title>
            <h2>
                {title}
            </h2>
            <div className="inputContainer">
                <fieldset>
                    {children}
                </fieldset>
                <Button
                    title={buttonName}
                    type="submit"
                />
            </div>
            <Link to={src}>
                {
                    isRegister && <FiArrowLeft />
                }
                {linkName}
            </Link>
        </Container>
    );
}