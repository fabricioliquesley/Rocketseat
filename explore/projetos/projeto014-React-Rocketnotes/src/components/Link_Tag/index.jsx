import { FiX } from "react-icons/fi";
import { Container } from "./style";

export function LinkTag({ src, text }) {
    return (
        <Container>
            {src ? <a href={src}>{src}</a> : <p>{text}</p>}   
            <button>
                <FiX />
            </button>
        </Container>
    );
}