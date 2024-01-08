import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./style";

export function TagItem({value, onClick, isNew, ...rest}) {
    return (
        <Container $isNew={isNew}>
            <input 
                type="text" 
                value={value} 
                disabled={!isNew}
                {...rest}
            />
            <button onClick={onClick}>
                {isNew ? <FiPlus/> : <FiX/>}
            </button>
        </Container>
    );
}