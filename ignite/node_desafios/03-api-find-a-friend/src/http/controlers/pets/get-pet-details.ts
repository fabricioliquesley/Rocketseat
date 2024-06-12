import { makeGetPetDetailsService } from "@/services/factories/make-get-pet-details-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getPetDetailsQuerySchema = z.object({
  id: z.string(),
});

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getPetDetailsQuerySchema.parse(request.query);

  const getPetDetailsService = makeGetPetDetailsService();

  const { pet } = await getPetDetailsService.executeGetPetDetails({ id });

  return reply.status(200).send({
    pet,
  });
}
