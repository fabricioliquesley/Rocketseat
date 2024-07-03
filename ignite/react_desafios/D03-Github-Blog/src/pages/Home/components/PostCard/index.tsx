import { formatDistanceToNow } from "date-fns";
import { PostType } from "../../../../contexts/postsContext";
import { CardContainer } from "./styles";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  postData: PostType;
}

export function PostCard({ postData }: PostCardProps) {
  const { number, title, created_at, body } = postData;

  const navigate = useNavigate()

  function navigateToPost() {
    navigate(`/post/${number}`)
  }

  return (
    <CardContainer onClick={navigateToPost}>
      <header>
        <h3>{title}</h3>
        <span>
          {formatDistanceToNow(created_at, {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </header>
      <p>{body}</p>
    </CardContainer>
  );
}
