import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UserRepository } from "../repositories/userRepository";
import { UserServices } from "../services/usersServices";

export async function userRoutes(app: FastifyInstance) {
  const usersServices = new UserServices(new UserRepository());

  app.post("/users", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const result = bodySchema.safeParse(request.body);

    if (!result.success) {
      const errors = new Array<object>();

      result.error.issues.map((error) => {
        const { message, path } = error;

        errors.push({ message: `${message} em ${path}` });
      });

      return reply.status(404).send({ errors });
    }

    const { name, email, password } = result.data;

    await usersServices.createUser({data: {name, email, password}});

    return reply.status(201).send();
  });
}
