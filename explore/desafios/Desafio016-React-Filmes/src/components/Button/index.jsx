import { Container } from "./style";

export function Button({ title, type = "button", alternate = false}) {
    return (
        <Container type={type} $alternate={alternate}>
            {title}
        </Container>
    );
}