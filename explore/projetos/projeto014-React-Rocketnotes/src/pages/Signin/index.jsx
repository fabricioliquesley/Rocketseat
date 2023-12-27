import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form, Image, Main } from "./style";

export function Signin() {
    return (
        <Main>
            <Form>
                <div>
                    <div>
                        <h1>Rocket Notes</h1>
                        <p>
                            Aplicação para salvar e gerenciar seus links úteis.
                        </p>
                    </div>
                    <h2>
                        Faça seu login
                    </h2>
                    <fieldset>
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
                        <Button title="Entrar" />
                    </fieldset>
                </div>
                <a href="#">
                    Criar conta
                </a>
            </Form>
            <Image />
        </Main>
    );
}