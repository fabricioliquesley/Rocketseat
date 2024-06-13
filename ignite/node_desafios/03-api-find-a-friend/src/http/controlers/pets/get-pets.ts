import { makeGetPetsService } from "@/services/factories/make-get-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getPetsQuerySchema = z.object({
  city: z.string(),
});

const getPetDetailsBodySchema = z.object({
  searchDescription: z.string().nullish(),
});

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { city } = getPetsQuerySchema.parse(request.query);
    const { searchDescription } = getPetDetailsBodySchema.parse(request.body);

    const getPetsService = makeGetPetsService();

    const { pets } = await getPetsService.executeGetPets({ city, searchDescription });

    return reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.errors,
      });
    }

    throw error;
  }
}
