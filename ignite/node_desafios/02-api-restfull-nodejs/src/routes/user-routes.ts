import { FastifyInstance } from "fastify";
import { array, z } from "zod";
import { UserRepository } from "../repositories/userRepository";

export async function userRoutes(app: FastifyInstance) {
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

    const userRepository = new UserRepository();

    await userRepository.createUser({
      table: "users",
      data: { name, email, password },
    });

    return reply.status(201).send();
  });
}
