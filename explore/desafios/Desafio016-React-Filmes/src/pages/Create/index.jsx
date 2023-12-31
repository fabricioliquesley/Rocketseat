import { Container, Main, TagsContainer } from "./style";
import { Header } from "../../components/Header";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { TagItem } from "../../components/TagItem";
import { Button } from "../../components/Button";

export function Create() {
    return (
        <Container>
            <Header
                name="Mayk Brito"
                src="https://github.com/maykbrito.png"
            />
            <Main>
                <div>
                    <Link title="Voltar" />
                    <h1>
                        Novo filme
                    </h1>
                </div>
                <fieldset>
                    <Input
                        placeholder="Título"
                    />
                    <Input
                        placeholder="Sua nota (de 0 a 5)"
                    />
                </fieldset>
                <textarea placeholder="Observações"></textarea>
                <TagsContainer>
                    <h2>Marcadores</h2>
                    <div>
                        <TagItem 
                            value="React"
                        />
                        <TagItem 
                            isNew
                            placeholder="Novo marcador"
                        />
                    </div>
                </TagsContainer>
                <div className="btnContainer">
                    <Button title="Excluir filme" alternate/>
                    <Button title="Salvar alterações"/>
                </div>
            </Main>
        </Container>
    );
}