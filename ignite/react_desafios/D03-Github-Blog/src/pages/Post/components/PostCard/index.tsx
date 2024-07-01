import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "../../../../components/Link";
import { BackLink, CardContainer } from "./styles";
import { faCalendarDay, faChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function PostCard() {
  return (
    <CardContainer>
      <div className="header">
        <BackLink to={"/"}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </BackLink>
        <Link name="VER NO GITHUB" to="#" />
      </div>
      <h2>JavaScript data types and data structures</h2>
      <div className="postDetails">
        <div>
          <FontAwesomeIcon icon={faGithub} />
          <span>cameronwll</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>Há 1 dia</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faComment} />
          <span>5 comentários</span>
        </div>
      </div>
    </CardContainer>
  );
}
