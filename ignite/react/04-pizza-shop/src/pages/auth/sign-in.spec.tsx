import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./sign-in";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClint } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter
              initialEntries={["/sig-in?email=johndoe@example.com"]}
            >
              <QueryClientProvider client={queryClint}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

    expect(emailInput.value).toBe("johndoe@example.com");
  });
});
