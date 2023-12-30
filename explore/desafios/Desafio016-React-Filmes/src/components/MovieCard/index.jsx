import { RatingStar } from "../Rating";
import { Tag } from "../Tag";
import { Container } from "./style";

export function MovieCard({ movieData }) {
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
        <Container>
            <div>
                <h2>{movieData.name}</h2>
                <RatingStar rating={movieData.rating}/>
            </div>
            <p>
                {movieData.detail}
            </p>
            {movieData.tags && renderTagList(movieData.tags)}
        </Container>
    );
}