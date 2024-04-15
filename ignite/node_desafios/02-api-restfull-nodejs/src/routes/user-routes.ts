import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UserRepository } from "../repositories/userRepository";
import { UserServices } from "../services/usersServices";
import { throwParametersError } from "../utils/throwParametersError";

export async function userRoutes(app: FastifyInstance) {
  const userRepository = new UserRepository();
  const usersServices = new UserServices(userRepository);

  app.post("/", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const result = bodySchema.safeParse(request.body);

    if (!result.success) {
      return throwParametersError(result.error.issues, reply);
    }

    const { name, email, password } = result.data;

    await usersServices.createUser({ data: { name, email, password } });

    return reply.status(201).send();
  });

  app.post("/session", async (request, reply) => {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const userSessionSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      created_at: z.string(),
    });

    const result = bodySchema.safeParse(request.body);

    if (!result.success) {
      return throwParametersError(result.error.issues, reply);
    }

    const { email, password } = result.data;

    const user = userSessionSchema.parse(
      await usersServices.createSession({
        data: { email, password },
      })
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      const $7_DAYS = 60 * 60 * 24 * 7;

      sessionId = user.id;

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: $7_DAYS,
      });
    }

    return reply.status(200).send({ user });
  });
}
