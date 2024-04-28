import { HandsClapping, Trash } from 'phosphor-react';
import styles from './Comment.module.css'
import { Avatar } from '../Avatar';

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} source="https://github.com/diego3g.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Rodrigo Gonçalves</strong>
              <time title="11 de Abril as 09:13h" dateTime="2024-04-11 09:13:00">
                Cerca de 1h atrás
              </time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>
            Muito bom Diego, parabéns!! 👏👏
          </p>
        </div>
        <footer>
          <button>
            <HandsClapping />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}