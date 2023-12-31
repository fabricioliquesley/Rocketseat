import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./style";

export function TagItem({value, isNew, ...rest}) {
    return (
        <Container isNew={isNew}>
            <input 
                type="text" 
                value={value} 
                disabled={!isNew}
                {...rest}
            />
            <button>
                {isNew ? <FiPlus/> : <FiX/>}
            </button>
        </Container>
    );
}