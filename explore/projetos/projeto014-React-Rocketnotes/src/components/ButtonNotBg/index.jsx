import { Container } from "./styles";

export function ButtonNotBg({ title, isActive = false, ...rest }) {
    return (
        <Container
            $isactive={isActive.toString()}
            type="button"
            {...rest}
        >
            {title}
        </Container>
    );
}