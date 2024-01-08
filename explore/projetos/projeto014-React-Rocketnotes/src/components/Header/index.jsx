import { Container, Profile, Logaut } from "./styles";
import { RiShutDownLine } from "react-icons/ri"
import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import defaultImg from "../../assets/images/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
    const { signOut, user } = useAuth()
    const navigate = useNavigate()

    function handleSignOut(){
        navigate("/");

        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : defaultImg;

    return (
        <Container>
            <Profile to="/profile">
                <img
                    src={avatarUrl}
                    alt={user.name}
                />
                <div>
                    <span>Bem vindo,</span>
                    <strong>
                        {user.name}
                    </strong>
                </div>
            </Profile>
            <Logaut onClick={handleSignOut}>
                <RiShutDownLine />
            </Logaut>
        </Container>
    )
}