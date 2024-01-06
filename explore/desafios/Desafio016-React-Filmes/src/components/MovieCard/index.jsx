import { RatingStar } from "../Rating";
import { Tag } from "../Tag";
import { Container } from "./style";

export function MovieCard({ movieData, ...rest }) {
    function renderTagList(listaTags) {
        return (
            <ul>
                {
                    listaTags.map(tag => {
                        return <Tag key={tag.id}>{tag.name}</Tag>
                    })
                }
            </ul>
        )
    }

    return (
        <Container {...rest}>
            <div>
                <h2>{movieData.title}</h2>
                <RatingStar rating={movieData.rating}/>
            </div>
            <p>
                {movieData.description}
            </p>
            {movieData.tags && renderTagList(movieData.tags)}
        </Container>
    );
}