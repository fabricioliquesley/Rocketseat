import { Container } from "./style";

export function Button({ title, type = "button", ...rest}) {
    return (
        <Container type={type} {...rest}>
            {title}
        </Container>
    );
}