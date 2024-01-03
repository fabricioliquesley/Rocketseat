import { Container, Main, Content, Textarea } from "./style";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NotesItem";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export function CreateNotes() {
    return (
        <Container>
            <Header />
            <Main>
                <Content>
                    <div>
                        <h2>Criar nota</h2>
                        <Link to="/">Voltar</Link>
                    </div>
                    <fieldset>
                        <Input placeholder="Título" />
                        <Textarea placeholder="Observação" />
                    </fieldset>
                    <Section title="Links úteis">
                        <ul>
                            <NoteItem value="https://www.rocketseat.com.br/" />
                        </ul>
                        <NoteItem isNew placeholder="Novo link" />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tagsContainer">
                            <NoteItem value="React" />
                            <NoteItem isNew placeholder="Novo marcador" />
                        </div>
                    </Section>
                    <Button title="Salvar" />
                </Content>
            </Main>
        </Container>
    );
}