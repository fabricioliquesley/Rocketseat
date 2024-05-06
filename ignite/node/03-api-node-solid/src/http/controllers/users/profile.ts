import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const requestUserSchema = z.object({
    sub: z.string(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { sub } = requestUserSchema.parse(request.user);

  const { user } = await getUserProfile.execute({
    userId: sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
