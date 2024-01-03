import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import { Container, ImageProfile, Form } from "./style";

import { api } from "../../services/api";
import defaultImg from "../../assets/images/avatar_placeholder.svg"

import { useAuth } from "../../hooks/auth"

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : defaultImg;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: newPassword,
            old_password: oldPassword,
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>
            <header>
                <button
                    type="button"
                    onClick={handleBack}
                >
                    <FiArrowLeft size={25} />
                </button>

            </header>
            <ImageProfile>
                <img src={avatar} alt="Foto de perfil" />
                <div>
                    <FiCamera />
                    <input type="file" onChange={handleChangeAvatar} />
                </div>
            </ImageProfile>
            <Form>
                <fieldset>
                    <Input
                        icon={FiUser}
                        placeholder="Nome"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        icon={FiMail}
                        placeholder="E-mail"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <Input
                        icon={FiLock}
                        placeholder="Senha atual"
                        type="password"
                        onChange={e => setOldPassword(e.target.value)}
                    />
                    <Input
                        icon={FiLock}
                        placeholder="Nova senha"
                        type="password"
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </fieldset>
                <Button title="Salvar" onClick={handleUpdate} />
            </Form>
        </Container>
    );
}