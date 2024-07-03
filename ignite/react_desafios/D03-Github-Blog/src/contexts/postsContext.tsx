import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";

interface PostProviderProps {
  children: ReactNode;
}

export type PostType = {
  html_url: string;
  number: number;
  title: string;
  user: { login: string };
  comments: number;
  created_at: string;
  body: string;
};

interface PostsContextType {
  posts: PostType[];
  fetchIssues: (query?: string) => Promise<void>;
}

export const PostsContext = createContext({} as PostsContextType);

export function PostsProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchIssues = useCallback(async (query?: string) => {
    const posts = await api.get(
      `/search/issues?q=${query ?? ""}repo:sivagao/blog`
    );

    setPosts(posts.data["items"]);
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <PostsContext.Provider value={{ posts, fetchIssues }}>
      {children}
    </PostsContext.Provider>
  );
}
