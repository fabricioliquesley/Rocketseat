import { FiPlus } from "react-icons/fi";
import { Container } from "./style";

export function Add({title}) {
    return (
        <Container>
            <input type="text" placeholder={title} />
            <button>
                <FiPlus />
            </button>
        </Container>
    );
}