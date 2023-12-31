import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Container } from "./style";
import { FiUser, FiMail, FiLock } from "react-icons/fi"

export function SignUp() {
    return (
        <Container>
            <Form
                title="Crie sua conta"
                buttonName="Cadastrar"
                linkName="Voltar para o login"
                src="/"
                isRegister
            >
                <Input
                    icon={FiUser}
                    placeholder="Nome"
                />
                <Input
                    icon={FiMail}
                    placeholder="E-mail"
                />
                <Input
                    icon={FiLock}
                    placeholder="Senha"
                />
            </Form>
            <BgForm />
        </Container>
    );
}