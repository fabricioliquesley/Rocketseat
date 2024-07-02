import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "./styles";

interface LinkProps {
  name: string;
  to: string;
}

export function Link({ name, to }: LinkProps) {
  return (
    <LinkContainer href={to} target="_blank">
      {name} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </LinkContainer>
  );
}
