import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateService } from "../authenticate";

export function makeAuthenticateService() {
  const orgRepository = new PrismaOrgRepository();
  const authenticateService = new AuthenticateService(orgRepository);

  return authenticateService;
}
