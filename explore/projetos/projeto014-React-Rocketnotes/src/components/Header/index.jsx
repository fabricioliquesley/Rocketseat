import { Container, Profile, Logaut } from "./styles";
import { RiShutDownLine } from "react-icons/ri"
import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import defaultImg from "../../assets/images/avatar_placeholder.svg";

export function Header() {
    const { signOut, user } = useAuth()

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
            <Logaut onClick={signOut}>
                <RiShutDownLine />
            </Logaut>
        </Container>
    )
}