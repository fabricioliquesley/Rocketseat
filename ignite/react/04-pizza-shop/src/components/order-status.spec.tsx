import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("Order Status", () => {
  it("should display the right text when order status is pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("pendente");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text when order status is canceled", () => {
    const wrapper = render(<OrderStatus status="canceled" />);

    const statusText = wrapper.getByText("cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should display the right text when order status is delivered", () => {
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText("entregue");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });

  it("should display the right text when order status is delivering", () => {
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText("a caminho");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is processing", () => {
    const wrapper = render(<OrderStatus status="processing" />);

    const statusText = wrapper.getByText("em preparo");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });
});