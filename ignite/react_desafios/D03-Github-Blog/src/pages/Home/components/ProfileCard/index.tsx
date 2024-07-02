import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "../../../../components/Link";
import { Avatar, CardContainer, ProfileInfo } from "./styles";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ProfileContext } from "../../../../contexts/profileContext";

export function ProfileCard() {
  const { profile } = useContext(ProfileContext);

  return (
    <CardContainer>
      <Avatar src={profile.avatar_url} alt="" />
      <ProfileInfo>
        <div className="header">
          <strong>{profile.name}</strong>
          <Link name="GITHUB" to={profile.html_url} />
        </div>
        <p>{profile.bio}</p>
        <div className="profileDetails">
          <div>
            <FontAwesomeIcon icon={faGithub} />
            <span>{profile.login}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBuilding} />
            <span>{profile.company}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faUserGroup} />
            <span>
              {profile.followers}{" "}
              {profile.followers > 1 ? "seguidores" : "seguidor"}
            </span>
          </div>
        </div>
      </ProfileInfo>
    </CardContainer>
  );
}
