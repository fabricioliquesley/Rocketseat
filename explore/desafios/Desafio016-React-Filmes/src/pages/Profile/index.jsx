import { FiCamera, FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Avatar, Container, Form, Header } from "./style";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import defaultImg from "../../assets/images/avatar_placeholder.svg";

import { useAuth } from "../../hook/auth";

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : defaultImg;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: newPassword,
            oldPassword
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({user: userUpdated, avatarFile})
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>
            <Header>
                <button onClick={handleBack}>
                    <FiArrowLeft/>
                </button>
            </Header>
            <Avatar>
                <img src={avatar} />
                <div>
                    <input type="file" onChange={handleChangeAvatar}/>
                    <FiCamera />
                </div>
            </Avatar>
            <Form>
                <fieldset>
                    <Input
                        icon={FiUser}
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        icon={FiMail}
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <Input
                        icon={FiLock}
                        placeholder="Senha atual"
                        onChange={e => setOldPassword(e.target.value)}
                        />
                    <Input
                        icon={FiLock}
                        placeholder="Nova senha"
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </fieldset>
                <Button title="Salvar" onClick={handleUpdate} />
            </Form>
        </Container>
    );
}