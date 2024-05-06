import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const requestUserSchema = z.object({
    sub: z.string(),
  });

  const { sub } = requestUserSchema.parse(request.user);
  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    userId: sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
