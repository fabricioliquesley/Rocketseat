import { Container } from "./style";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

export function RatingStar({ rating }) {
    function renderStars(rating) {
        let stars = [];
        let n = 0;

        let fullStars = Math.floor(rating)

        for (let i = 0; i < fullStars; i++) {
            stars.push({
                id: n++,
                tag: <IoIosStar key={i} />
            });
        }

        if (stars.length < 5){
            let leftovers = 5 - rating;
            let emptyStar = Math.floor(leftovers)

            let halfStars = leftovers - emptyStar;

            if (halfStars > 0 && halfStars < 1){
                stars.push({
                    id: n++,
                    tag: <IoIosStarHalf/>
                })
            }

            for (let i = 0; i < emptyStar; i++) {
                stars.push({
                    id: n++,
                    tag: <IoIosStarOutline/>
                });
            } 
        }

        return (
            <>{
                stars.map(star => <li key={star.id}>{star.tag}</li>) 
            }</>
        );
    }

    return (
        <Container>
            {renderStars(rating)}
        </Container>
    );
}