import { Container, StatusBar } from "./style";
import { FiX } from "react-icons/fi";

export function MessageBox({ type, message, ...rest }) {
    return (
        <Container $type={type.toLowerCase()} {...rest}>
            <StatusBar />
            <div>
                <h2>
                    {type}
                </h2>
                <p>
                    {message}
                </p>
            </div>
            <button>
                <FiX />
            </button>
        </Container>
    );
}