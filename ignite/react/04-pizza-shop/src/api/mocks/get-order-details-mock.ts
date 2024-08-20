import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsResponse,
  GetOrderDetailsParams,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    status: "pending",
    totalInCents: 4500,
    customer: {
      name: "John Smith",
      email: "john.smith@gmail.com",
      phone: "123-456",
    },
    orderItems: [
      {
        id: "Ix03",
        priceInCents: 2000,
        quantity: 2,
        product: { name: "pizza Calabresa" },
      },
      {
        id: "Ix04",
        priceInCents: 2500,
        quantity: 2,
        product: { name: "pizza 4 Queijos" },
      },
    ],
    createdAt: new Date().toISOString(),
  });
});
