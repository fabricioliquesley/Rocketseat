import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "../../../../components/Link";
import { BackLink, CardContainer } from "./styles";
import {
  faCalendarDay,
  faChevronLeft,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PostType } from "../../../../contexts/postsContext";

interface PostCardProps {
  postData: PostType;
}

export function PostCard({ postData }: PostCardProps) {
  const { title, user, comments, created_at, html_url } = postData;

  if (!user || !created_at) {
    return null;
  }

  return (
    <CardContainer>
      <div className="header">
        <BackLink to={"/"}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </BackLink>
        <Link name="VER NO GITHUB" to={html_url} />
      </div>
      <h2>{title}</h2>
      <div className="postDetails">
        <div>
          <FontAwesomeIcon icon={faGithub} />
          <span>{user.login}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>
            {formatDistanceToNow(created_at, {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faComment} />
          <span>
            {comments} {comments > 1 ? "comentários" : "comentário"}
          </span>
        </div>
      </div>
    </CardContainer>
  );
}
