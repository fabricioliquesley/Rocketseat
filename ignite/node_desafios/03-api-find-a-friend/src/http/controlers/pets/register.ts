import { makeCreatePetServices } from "@/services/factories/make-create-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerBodySchema = z.object({
  category: z.enum(["dog", "cat", "bird", "rodents"]),
  gender: z.enum(["male", "female"]),
  details: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { category, gender, details } = registerBodySchema.parse(request.body);
  const orgId = request.user.sub;

  const createPetService = makeCreatePetServices();

  await createPetService.executeCreate({
    category,
    gender,
    details,
    orgId,
  });

  return reply.status(201).send();
}
