import { Container, StatusBar } from "./style";
import { FiX } from "react-icons/fi";

export function MessageBox({ type, message }) {
    return (
        <Container $type={type.toLowerCase()}>
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