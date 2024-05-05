import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  )

  const timeBetweenPublicationAndNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar source={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {timeBetweenPublicationAndNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(row => {
            if (row.type == "paragraph") {
              return <p>{row.content}</p>
            } else {
              return <p><a href="#">{row.content}</a></p>
            }
        })}
      </div>
      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Deixe um comentário"
        />
        <div>
          <button type="submit">Publicar</button>
        </div>
      </form>
      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  );
}