import { ProfileProvider } from "../../contexts/profileContext";
import { Input } from "./components/Input";
import { PostCard } from "./components/PostCard";
import { ProfileCard } from "./components/ProfileCard";
import {
  HomeContainer,
  PublicationsSections,
  PublicationsContainer,
} from "./styles";

export function Home() {
  const posts = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

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
          <Input placeholder="Buscar conteúdo" type="text" />
        </div>
        <PublicationsContainer>
          {posts.map((post) => (
            <PostCard />
          ))}
        </PublicationsContainer>
      </PublicationsSections>
    </HomeContainer>
  );
}
