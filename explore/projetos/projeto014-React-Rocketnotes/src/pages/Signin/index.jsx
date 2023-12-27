import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Main } from "./style";
import { Form } from "../../components/Form"
import { BgForm } from "../../components/BgForm"

export function Signin() {
    return (
        <Main>
            <Form
                title="Faça seu login"
                buttonName="Entrar"
                link="Criar conta"
            >
                <Input
                    icon={FiMail}
                    type="text"
                    placeholder="E-mail"
                />
                <Input
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                />
            </Form>
            <BgForm />
        </Main>
    );
}