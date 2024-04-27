import { Header } from "./components/Header"
import { Post } from "./components/Post"

import "./global.css"

export function App() {
  return (
    <main>
      <Header />
      <Post
        author="Fabrício Santos"
        content="JavaScript é incrível ❤"
      />
      <Post
        author={"Gabriel Guedes"}
        content={"Esculte minha musica nova"}
      />
    </main>
  )
}
