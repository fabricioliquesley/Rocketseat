import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  background: ${(props) => props.theme["base-profile"]};
  padding: 3.2rem 4rem;
  border-radius: 1rem;
  box-shadow: 0px 2px 28px 0px rgba(0, 0, 0, 0.2);
`;

export const Avatar = styled.img`
  width: 14.8rem;
  height: 14.8rem;
  border-radius: 0.8rem;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  & > .header,
  & > .profileDetails {
    display: flex;
    align-items: center;
  }

  & > .header {
    justify-content: space-between;

    strong {
      color: ${props => props.theme["base-title"]};
      font-size: 2.4rem;
      line-height: 130%;
    }
  }

  & > p {
    margin: 0.8rem 0 2.4rem;
    line-height: 160%;
  }

  & > .profileDetails {
    gap: 2.4rem;

    div {
      display: flex;
      align-items: center;
      gap: .8rem;

      svg {
        width: 1.8rem;
        height: 1.8rem;
        color: ${props => props.theme["base-label"]};
      }

      span {
        color: ${props => props.theme["base-subtitle"]};
        line-height: 160%;
      }
    }
  }
`;
