import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const requestUserSchema = z.object({
    sub: z.string(),
  });

  const { sub } = requestUserSchema.parse(request.user);

  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkCount } = await getUserMetricsUseCase.execute({
    userId: sub,
  });

  return reply.status(200).send({ checkCount });
}
