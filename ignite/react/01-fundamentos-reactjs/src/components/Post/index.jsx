import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import styles from "./Post.module.css"

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar source="https://github.com/diego3g.png" />
          <div className={styles.authorInfo}>
            <strong>Diego Fernandes</strong>
            <span>Web Developer</span>
          </div>
        </div>
        <time title="11 de Abril as 09:13h" dateTime="2024-04-11 09:13:00">
          Publicado há 1h
        </time>
      </header>
      <div className={styles.content}>
        <p>Fala dev 🖐</p>
        <p>
          Acabei de subir mais um projeto no meu polifólio. É um projeto que fiz no NLW Return, evento da Rocketseat.
        </p>
        <p><a href="#">jane.design/doctor-care</a></p>
        <p>
          <a href="#">#novo-projeto</a>{" "}
          <a href="#">#nlw </a>{" "}
          <a href="#">#rocketseat</a>
        </p>
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