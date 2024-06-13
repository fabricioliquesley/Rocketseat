import { makeGetPetsService } from "@/services/factories/make-get-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getPetsQuerySchema = z.object({
  city: z.string(),
});

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const { city } = getPetsQuerySchema.parse(request.query);

  const getPetsService = makeGetPetsService();

  const { pets } = await getPetsService.executeGetPets({ city });

  return reply.status(200).send({ pets });
}
