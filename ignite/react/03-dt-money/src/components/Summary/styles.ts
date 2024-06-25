import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  width: 100%;
  max-width: 1120px;
  margin: -5rem auto 0;
  padding: 0 1.5rem;
`;

interface SummaryCardProps {
  variant?: "green";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme["gray-600"]};
  padding: 2.4rem;
  border-radius: 6px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      color: ${(props) => props.theme["gray-300"]};
    }
  }

  strong {
    display: block;
    color: ${(props) => props.theme["gray-100"]};
    font-size: 2rem;

    margin-top: 0.75rem;
  }

  ${props => props.variant === "green" && css`
    background: ${props.theme["green-700"]};
  `}
`;
