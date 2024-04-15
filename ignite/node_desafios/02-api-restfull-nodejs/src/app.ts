import fastify from "fastify";
import { userRoutes } from "./routes/user-routes";
import cookie from "@fastify/cookie";
import { mealRoutes } from "./routes/meal-routes";

export const app = fastify();

app.register(cookie);

app.register(userRoutes, {
  prefix: "users",
});

app.register(mealRoutes, {
  prefix: "meals"
})