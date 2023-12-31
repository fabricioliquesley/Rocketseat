import { Container } from "./style";

export function Tag({children, ...rest}) {
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}