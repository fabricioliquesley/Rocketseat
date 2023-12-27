import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import { Container, ImageProfile, Form } from "./style";

export function Profile() {
    return (
        <Container>
            <header>
                <a href="/">
                    <FiArrowLeft size={25} />
                </a>
                <ImageProfile>
                    <img src="https://github.com/diego3g.png" alt="Foto de perfil" />
                    <div>
                        <FiCamera />
                        <input type="file" />
                    </div>
                </ImageProfile>
            </header>
            <Form>
                <fieldset>
                    <Input
                        icon={FiUser}
                        placeholder="Nome"
                        type="text"
                    />
                    <Input
                        icon={FiMail}
                        placeholder="E-mail"
                        type="text"
                    />
                </fieldset>
                <fieldset>
                    <Input
                        icon={FiLock}
                        placeholder="Senha atual"
                        type="password"
                    />
                    <Input
                        icon={FiLock}
                        placeholder="Nova senha"
                        type="password"
                    />
                </fieldset>
                <Button title="Salvar" />
            </Form>
        </Container>
    );
}