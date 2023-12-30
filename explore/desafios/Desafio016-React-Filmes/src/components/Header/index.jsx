import { Container, Profile, Avatar, Username } from "./style";
import { Link } from "../Link"
import { Input } from "../Input";

export function Header({ name, src }) {
    return (
        <Container>
            <Link title="RocketMovies" isLogo />
            <Input placeholder="Pesquisar pelo título" />
            <Profile >
                <div>
                    <Username to="/profile">
                        <strong>
                            {name}
                        </strong>
                    </Username>
                    <button>
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