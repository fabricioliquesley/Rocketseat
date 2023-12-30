import { Container } from "./style";
import { FiArrowLeft } from "react-icons/fi";

export function Link({ title, isLogo = false, ...rest }) {
    return (
        <Container to="/" {...rest}>
            {
                isLogo 
                    ? <h2>{title}</h2> 
                    : <div><FiArrowLeft/><p>{title}</p></div> 
            }
        </Container>
    );
}