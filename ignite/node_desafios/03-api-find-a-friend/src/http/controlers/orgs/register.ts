import { OrgAlreadyExistsError } from "@/services/erros/org-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerBodySchema = z.object({
  email: z.string(),
  password: z.string(),
  address: z.string(),
  name: z.string(),
  whatsApp_number: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, address, name, whatsApp_number } =
    registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    await registerService.executeRegister({
      email,
      password,
      address,
      name,
      whatsApp_number,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
