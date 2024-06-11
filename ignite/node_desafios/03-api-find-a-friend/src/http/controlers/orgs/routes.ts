import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/organization/register", register)
  app.post("/organization/session", authenticate)
  app.patch("/token/refresh", refresh)
}