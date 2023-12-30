import { Container } from "./style";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

export function RatingStar({ rating }) {
    function renderStars(rating) {
        let stars = [];

        let fullStars = Math.floor(rating)

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoIosStar key={i} />);
        }

        if (stars.length < 5){
            let leftovers = 5 - rating;
            let emptyStar = Math.floor(leftovers)

            let halfStars = leftovers - emptyStar;

            if (halfStars > 0 && halfStars < 1){
                stars.push(<IoIosStarHalf/>)
            }

            for (let i = 0; i < emptyStar; i++) {
                stars.push(<IoIosStarOutline/>);
            } 
        }

        return (
            <>{stars}</>
        );
    }

    return (
        <Container>
            {renderStars(rating)}
        </Container>
    );
}