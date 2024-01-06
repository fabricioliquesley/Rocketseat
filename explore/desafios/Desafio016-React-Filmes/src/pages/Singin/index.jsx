import { useState } from "react";
import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container } from "./style";
import { FiMail, FiLock } from "react-icons/fi"

import { useAuth } from "../../hook/auth";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleLogin() {
        if (!email || !password) {
            return alert("Preencha todos os campos!")

        }

        signIn({email, password})
    }
    return (
        <Container>
            <Form
                title="Faça seu login"
                linkName="Criar conta"
                src="/register"
            >
                <Input
                    icon={FiMail}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={FiLock}
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    title="Entrar"
                    onClick={handleLogin}
                />
            </Form>
            <BgForm />
        </Container>
    );
}