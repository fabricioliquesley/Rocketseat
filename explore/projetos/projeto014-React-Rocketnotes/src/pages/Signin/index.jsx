import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Main } from "./style";
import { Form } from "../../components/Form"
import { BgForm } from "../../components/BgForm"
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/auth";

export function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    
    function handleSignIn() {
        if (!email || !password) {
            return alert("Preencha todos os campos!")
        }
        
        signIn({email, password});
    }

    return (
        <Main>
            <Form
                title="Faça seu login"
                buttonName="Entrar"
                link="Criar conta"
                href="/register"
            >
                <Input
                    icon={FiMail}
                    type="text"
                    placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    title="Entrar"
                    onClick={handleSignIn}
                />
            </Form>
            <BgForm />
        </Main>
    );
}