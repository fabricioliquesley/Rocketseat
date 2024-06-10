import fastify from "fastify";
import { orgsRoutes } from "./http/controlers/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validations error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});