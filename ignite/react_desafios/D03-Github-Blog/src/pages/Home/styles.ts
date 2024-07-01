import styled from "styled-components";

export const HomeContainer = styled.main`
  max-width: 86.4rem;
  margin: -8.8rem auto 0;
`;

export const PublicationsSections = styled.section`
  margin-top: 6.2rem;

  & > .searchBox {
    position: sticky;
    top: 0rem;
    padding: 1rem 0 2rem;
    background: ${(props) => props.theme["base-background"]};

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.2rem;

      h3 {
        color: ${(props) => props.theme["base-subtitle"]};
        font-size: 1.8rem;
        line-height: 160%;
      }

      span {
        color: ${(props) => props.theme["base-span"]};
        font-size: 1.4rem;
        line-height: 160%;
      }
    }
  }
`;

export const PublicationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;
  margin: 2.8rem 0 4.8rem;
`;
