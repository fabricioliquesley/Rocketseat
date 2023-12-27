import { Container } from "./style";
import { Tag } from "../Tag";

export function Notes({ data, ...rest }) {
    function renderUl(data){
        return (
                <ul>
                    {
                        data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
                    }
                </ul>
        )
    }

    return (
        <Container {...rest}>
            <h2>{data.name}</h2>
            {data.tags && renderUl(data)}
        </Container>
    );
}