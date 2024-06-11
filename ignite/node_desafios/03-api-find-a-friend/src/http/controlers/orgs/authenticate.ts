import { invalidCredentialsError } from "@/services/erros/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateService = makeAuthenticateService();

    const { org } = await authenticateService.executeAuthenticate({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.errors,
      });
    }

    if (error instanceof invalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
