import { api } from "@/lib/axios";

export interface RegisterRestaurantRequestBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantRequestBody) {
  await api.post("/restaurants", { restaurantName, managerName, email, phone });
}
