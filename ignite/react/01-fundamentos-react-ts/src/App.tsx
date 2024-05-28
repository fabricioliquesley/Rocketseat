import "./global.css"
import styles from "./App.module.css"

import { posts } from "./utils/posts"
import { Sidebar } from "./components/Sidebar" 
import { Header } from "./components/Header"
import { Post } from "./components/Post"

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            ))
          }
        </main>
      </div>
    </div>
  )
}
