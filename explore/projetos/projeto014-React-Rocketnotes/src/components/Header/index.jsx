import { Container, Profile, Logaut } from "./styles";
import { RiShutDownLine } from "react-icons/ri"

export function Header({ name, src }) {
    return (
        <Container>
            <Profile name={name} src={src}>
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
            <Logaut>
                <RiShutDownLine/>
            </Logaut>
        </Container>
    )
}