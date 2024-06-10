import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

  async createOrg(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      whatsApp_number: data.whatsApp_number,
    };

    this.items.push(org);

    return org;
  }

  async findOrgByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email);

    if (!org) return null;

    return org;
  }
}
