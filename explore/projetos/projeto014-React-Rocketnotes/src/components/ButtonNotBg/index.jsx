import { Container } from "./styles";

export function ButtonNotBg({ title, isActive = false }) {
    return (
        <Container
            $isactive={isActive.toString()}
            type="button"
        >
            {title}
        </Container>
    );
}