import { useContext } from "react";
import { ProfileProvider } from "../../contexts/profileContext";
import { SearchForm } from "./components/SearchForm";
import { PostCard } from "./components/PostCard";
import { ProfileCard } from "./components/ProfileCard";
import {
  HomeContainer,
  PublicationsSections,
  PublicationsContainer,
} from "./styles";
import { PostsContext } from "../../contexts/postsContext";

export function Home() {
  const { posts } = useContext(PostsContext);

  return (
    <HomeContainer>
      <ProfileProvider>
        <ProfileCard />
      </ProfileProvider>
      <PublicationsSections>
        <div className="searchBox">
          <div className="header">
            <h3>Publicações</h3>
            <span>6 publicações</span>
          </div>
          <SearchForm placeholder="Buscar conteúdo" type="text" />
        </div>
        <PublicationsContainer>
          {posts.map((post) => (
            <PostCard postData={post} key={post.number} />
          ))}
        </PublicationsContainer>
      </PublicationsSections>
    </HomeContainer>
  );
}
