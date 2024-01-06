import { Container } from "./style";

export function Button({ title, type = "button", alternate = false, ...rest}) {
    return (
        <Container type={type} $alternate={alternate} {...rest}>
            {title}
        </Container>
    );
}