import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const NewTransactionButton = styled.button`
  background: ${props => props.theme["green-500"]};
  height: 50px;
  border: 0;
  border-radius: 6px;
  padding: 0 1.25rem;
  cursor: pointer;

  color: ${props => props.theme["white"]};
  font-weight: bold;

  &:hover {
    background: ${props => props.theme["green-700"]};
    transition: background-color 0.2s;
  }
`;
