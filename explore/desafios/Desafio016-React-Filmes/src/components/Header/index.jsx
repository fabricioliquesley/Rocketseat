import { Container, Profile, Avatar, Username } from "./style";
import { Link } from "../Link"
import { Input } from "../Input";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/auth";

export function Header({ src }) {
    const { user, signOut } = useAuth();

    const navigate = useNavigate();

    function handleSignOut() {
        navigate("/");
        
        signOut();
    }

    return (
        <Container>
            <Link title="RocketMovies" isLogo />
            <Input placeholder="Pesquisar pelo título" />
            <Profile >
                <div>
                    <Username to="/profile">
                        <strong>
                            {user.name}
                        </strong>
                    </Username>
                    <button onClick={handleSignOut}>
                        sair
                    </button>
                </div>
                <Avatar to="/profile">
                    <img src={src} alt="Foto de perfil" />
                </Avatar>
            </Profile>
        </Container>
    );
}