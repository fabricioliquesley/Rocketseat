import { render } from "@testing-library/react";

import { NavLink } from "./nav-link";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to={"/home"}>Inicio</NavLink>
        <NavLink to={"/about"}>Sobre</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("Inicio").dataset.current).toBe("false");
    expect(wrapper.getByText("Sobre").dataset.current).toBe("true");
  });
});
