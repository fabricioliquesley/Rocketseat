import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi"
import { Main } from "./style";
import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos!");
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar!");
                }
            })
    }

    return (
        <Main>
            <BgForm />
            <Form
                title="Crie sua conta"
                link="Voltar para o login"
                href="/"
            >
                <Input
                    icon={FiUser}
                    placeholder="Nome"
                    type="text"
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    icon={FiMail}
                    placeholder="E-mail"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    icon={FiLock}
                    placeholder="Senha"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    title="Cadastrar"
                    onClick={handleSignUp}
                />
            </Form>
        </Main>
    );
}