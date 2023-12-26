import { Container, Links, Tags } from "./style.js";
import { Header } from "../../components/Header/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Tag } from "../../components/Tag/index.jsx";
import { Button } from "../../components/Button/index.jsx";

export function Details() {
    return (
        <Container>
            <Header
                name="Fabricio Liquesley"
                src="https://github.com/diego3g.png"
            />

            <Section title="Links Úteis">
                <Links>
                    <li>
                        <a href="#">https://www.rocketseat.com.br/</a>
                    </li>
                    <li>
                        <a href="#">https://www.rocketseat.com.br/</a>
                    </li>
                </Links>
            </Section>

            <Section title="Marcadores">
                <Tags>
                    <Tag title="express"/>
                    <Tag title="nodejs"/>
                </Tags>
            </Section>

            <Button title="Voltar" />
        </Container>
    );
}