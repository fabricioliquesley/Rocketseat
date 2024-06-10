import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  createOrg(data: Prisma.OrgCreateInput): Promise<Org>
  findOrgByEmail(email: string): Promise<Org | null>
}