import { Header } from "./components/Header"
import { Post } from "./components/Post"

import "./global.css"
import styles from "./App.module.css"
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Fabrício Santos"
            content="JavaScript é incrível ❤"
          />
          <Post
            author={"Gabriel Guedes"}
            content={"Esculte minha musica nova"}
          />
        </main>
      </div>
    </div>
  )
}
