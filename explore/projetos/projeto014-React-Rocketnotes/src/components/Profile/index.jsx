import { Container } from "./styles";

export function Profile({ name, src }) {
    return (
        <Container>
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
        </Container>
    )
}