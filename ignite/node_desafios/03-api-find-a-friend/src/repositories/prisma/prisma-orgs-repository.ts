import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgRepository implements OrgsRepository {
  async createOrg(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });

    return org;
  }

  async findOrgByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    });

    return org;
  }
}
