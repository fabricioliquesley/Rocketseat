import {FiUser, FiMail, FiLock} from "react-icons/fi"
import { Main } from "./style";
import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";

export function Signup() {
    return (
        <Main>
            <BgForm />
            <Form
                title="Crie sua conta"
                buttonName="Cadastrar"
                link="Voltar para o login"
            >
                <Input
                    icon={FiUser}
                    placeholder="Nome"
                    type="text"
                />
                <Input
                    icon={FiMail}
                    placeholder="E-mail"
                    type="email"
                    autocomplete
                />
                <Input
                    icon={FiLock}
                    placeholder="Senha"
                    type="password"
                />
            </Form>
        </Main>
    );
}