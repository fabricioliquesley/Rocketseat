import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterServices } from "../register";

export function makeRegisterService(){
  const prismaOrgRepository = new PrismaOrgRepository()
  const registerService = new RegisterServices(prismaOrgRepository)

  return registerService
}