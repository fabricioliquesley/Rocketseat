import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Container } from "./style";
import {FiMail, FiLock} from "react-icons/fi"

export function SignIn() {
    return (
        <Container>
            <Form
                title="Faça seu login"
                buttonName="Entrar"
                linkName="Criar conta"
                src="/register"
            >
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