import { Container, Main, Content, Textarea } from "./style";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { LinkTag } from "../../components/Link_Tag";
import { Add } from "../../components/Add";
import { ButtonNotBg } from "../../components/ButtonNotBg";
import { Button } from "../../components/Button";

export function CreateNotes() {
    return (
        <Container>
            <Header
                name="Fabricio Liquesley"
                src="https://github.com/diego3g.png"
            />
            <Main>
                <Content>
                    <div>
                        <h2>Criar nota</h2>
                        <ButtonNotBg title="voltar" />
                    </div>
                    <fieldset>
                        <Input placeholder="Título" />
                        <Textarea placeholder="Observação" />
                    </fieldset>
                    <Section title="Links úteis">
                        <ul>
                            <LinkTag
                                src="https://github.com/diego3g"
                            />
                        </ul>
                        <Add title="Novo link" />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tagsContainer">
                            <LinkTag text="React" />
                            <Add title="Novo marcador" />
                        </div>
                    </Section>
                    <Button title="Salvar" />
                </Content>
            </Main>
        </Container>
    );
}