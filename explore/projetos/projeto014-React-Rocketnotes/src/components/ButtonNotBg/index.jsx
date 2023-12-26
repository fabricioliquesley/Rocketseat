import { Container } from "./styles";

export function ButtonNotBg({title}) {
    return (
        <Container
            type="button"
        >
            {title}
        </Container>
    );
}