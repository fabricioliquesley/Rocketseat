import { useParams } from "react-router-dom";
import { PostCard } from "./components/PostCard";
import { PostContainer, PostContent } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { PostType } from "../../contexts/postsContext";
import { api } from "../../lib/axios";
import Markdown from "react-markdown";

export function Post() {
  const [post, setPost] = useState({} as PostType);
  const params = useParams();

  const fetchPostByNumber = useCallback(async () => {
    try {
      const postResponse = await api.get(
        `/repos/sivagao/blog/issues/${params.number}`
      );
      setPost(postResponse.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [params.number]);

  useEffect(() => {
    fetchPostByNumber();
  }, [params.number]);

  return (
    <PostContainer>
      <PostCard postData={post} />
      <PostContent>
        <Markdown>{post.body}</Markdown>
      </PostContent>
    </PostContainer>
  );
}
