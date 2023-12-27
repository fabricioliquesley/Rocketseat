import { Container } from "./style";
import { Tag } from "../Tag";

export function Notes({ data, ...rest }) {
    return (
        <Container {...rest}>
            <h2>{data.name}</h2>
            {
                data.tags &&
                <ul>
                    {
                        data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
                    }
                </ul>
            }
        </Container>
    );
}