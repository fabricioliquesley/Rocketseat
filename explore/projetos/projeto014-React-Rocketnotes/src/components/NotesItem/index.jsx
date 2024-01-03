import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./style";

export function NoteItem({ value, isNew, onClick, ...rest }) {
    return (
        <Container $isnew={isNew}>
            <input 
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
            />
            <button onClick={onClick} type="button">
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    );
}