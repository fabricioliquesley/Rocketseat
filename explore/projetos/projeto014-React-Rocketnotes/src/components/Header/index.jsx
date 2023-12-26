import { Container } from "./styles";
import { Profile } from "../Profile";

export function Header({ name, src }) {
    return (
        <Container>
            <Profile name={name} src={src}/>
            <a href="#">
                <ion-icon name="power-outline"></ion-icon>
            </a>
        </Container>
    )
}