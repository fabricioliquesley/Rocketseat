import styled from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.section`
  padding: 32px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.COLORS.RED_200};
    display: flex;
    align-items: center;
    gap: 7px;
  }

  > small {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
  }
`;

export const Tasks = styled.div`
  border: 1px dashed  ${({ theme }) => theme.COLORS.RED_200};
  min-height: 154px;
  border-radius: 0.43rem;
  margin-top: 1rem;

  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: ${DEVICE_BREAKPOINT.MD}) {
    align-items: center;
    justify-content: center;
  }
`;