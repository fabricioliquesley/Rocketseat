import { Container, Profile, Avatar, Username } from "./style";
import { Link } from "../Link"
import { Input } from "../Input";
import defaultImg from "../../assets/images/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/auth";
import { api } from "../../services/api";

export function Header({ change }) {
    const { user, signOut } = useAuth();

    const navigate = useNavigate();

    function handleSignOut() {
        navigate("/");
        
        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : defaultImg;

    return (
        <Container>
            <Link title="RocketMovies" isLogo />
            <Input 
                placeholder="Pesquisar pelo título"
                onChange={change}
            />
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
                    <img src={avatarUrl} alt="Foto de perfil" />
                </Avatar>
            </Profile>
        </Container>
    );
}