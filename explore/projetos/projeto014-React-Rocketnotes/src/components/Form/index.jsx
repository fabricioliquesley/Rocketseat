import { Container } from "./style";
import { Button } from "../Button";
import { Link } from "react-router-dom"

export function Form({ title, buttonName, link, children, href }) {
    return (
        <Container>
            <div>
                <div>
                    <h1>Rocket Notes</h1>
                    <p>
                        Aplicação para salvar e gerenciar seus links úteis.
                    </p>
                </div>
                <h2>
                    {title}
                </h2>
                <fieldset>
                    {children}
                    <Button title={buttonName} />
                </fieldset>
            </div>
            <Link to={href}>
                {link}
            </Link>
        </Container>
    );
}