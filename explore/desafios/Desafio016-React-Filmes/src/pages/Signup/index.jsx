import { BgForm } from "../../components/BgForm";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Container } from "./style";
import { Button } from "../../components/Button";
import { FiUser, FiMail, FiLock } from "react-icons/fi"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){
            alert("Preencha todos os campos.");
        }

        api.post("/users", {name, email, password})
            .then(() => {
                navigate("/");

                alert("Usuário cadastrado!");
            })
            .catch((error) => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar o usuário!");
                }
            });
    }

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
                    onChange={(e) => setName(e.target.value)}
                />
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
                    title="Cadastrar"
                    onClick={handleSignUp}
                />
            </Form>
            <BgForm />
        </Container>
    );
}