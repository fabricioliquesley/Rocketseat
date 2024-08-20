import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "Rx01",
    name: "Pizza Shop",
    description: "The best Brazilian restaurant",
    managerId: "Ux01",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});
