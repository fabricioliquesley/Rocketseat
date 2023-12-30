import { FiCamera, FiUser, FiMail, FiLock } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { Avatar, Container, Form, Header } from "./style";

export function Profile() {
    return (
        <Container>
            <Header>
                <Link title="Voltar" />
            </Header>
            <Avatar>
                <img src="https://github.com/maykbrito.png" alt="Foto de perfil" />
                <div>
                    <input type="file" />
                    <FiCamera />
                </div>
            </Avatar>
            <Form>
                <fieldset>
                    <Input icon={FiUser} placeholder="Nome"/>
                    <Input icon={FiMail} placeholder="E-mail"/>
                </fieldset>
                <fieldset>
                    <Input icon={FiLock} placeholder="Senha atual"/>
                    <Input icon={FiLock} placeholder="Nova senha"/>
                </fieldset>
                <Button title="Salvar" type="submit" />
            </Form>
        </Container>
    );
}