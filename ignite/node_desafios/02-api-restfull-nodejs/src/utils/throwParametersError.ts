import { FastifyReply } from "fastify/types/reply";
import { ZodIssue } from "zod";

export function throwParametersError(issues: ZodIssue[], reply: FastifyReply) {
  const errors: { message: string }[] = [];

  issues.forEach(issue => {
    const { message, path } = issue;
    errors.push({ message: `${message} in ${path.join(".")}` });
  });

  return reply.status(404).send({ errors });
}