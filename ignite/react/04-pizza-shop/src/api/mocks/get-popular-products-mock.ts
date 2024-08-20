import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    { amount: 23, product: "Pizza Doce" },
    { amount: 18, product: "Pizza Vegan" },
    { amount: 42, product: "Pizza Calabresa" },
    { amount: 17, product: "Pizza Portuguesa" },
    { amount: 37, product: "Pizza 4 Queijos" },
  ]);
});
