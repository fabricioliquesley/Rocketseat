import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface PostProviderProps {
  children: ReactNode;
}

type User = {
  login: string;
};

export type PostType = {
  html_url: string;
  number: number;
  title: string;
  user: User;
  comments: string;
  created_at: string;
  body: string;
};

interface PostsContextType {
  posts: PostType[];
}

export const PostsContext = createContext({} as PostsContextType);

export function PostsProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      const posts = await api.get(`/search/issues?q=""repo:sivagao/blog`);

      setPosts(posts.data["items"]);
      console.log(posts.data["items"]);
    }

    fetchIssues();
  }, []);

  return (
    <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>
  );
}
