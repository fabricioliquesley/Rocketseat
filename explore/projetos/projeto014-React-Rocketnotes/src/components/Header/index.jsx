import { Container, Profile, Logaut } from "./styles";
import { RiShutDownLine } from "react-icons/ri"
import { useAuth } from "../../hooks/auth";

export function Header({ name, src }) {
    const {signOut} = useAuth()

    return (
        <Container>
            <Profile name={name} src={src} to="/profile">
                <img
                    src={src}
                    alt="Foto de perfil"
                />
                <div>
                    <span>Bem vindo,</span>
                    <strong>
                        {name}
                    </strong>
                </div>
            </Profile>
            <Logaut onClick={signOut}>
                <RiShutDownLine />
            </Logaut>
        </Container>
    )
}