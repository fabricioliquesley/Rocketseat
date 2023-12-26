import { Container } from "./style.js";
import { Header } from "../../components/Header/index.jsx";
import { Button } from "../../components/Button/index.jsx";

export function Details(){
    return (
        <Container>
            <Header 
                name="Fabricio Liquesley"
                src="https://github.com/diego3g.png"
            />
            
            <Button title="Voltar"/>
        </Container>
    );
}