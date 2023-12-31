import { Container } from "./style";

export function Tag({children, alternate}) {
    return (
        <Container $alternate={alternate}>
            {children}
        </Container>
    );
}