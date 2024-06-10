import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import bcrypt from "bcryptjs";
import { OrgAlreadyExistsError } from "./erros/org-already-exists-error";

const { hash } = bcrypt;

interface RegisterServicesProps {
  email: string;
  password: string;
  name: string;
  address: string;
  whatsApp_number: string;
}

interface RegisterServicesResponse {
  org: Org;
}

export class RegisterServices {
  constructor(private orgRepository: OrgsRepository) {}

  async executeRegister({
    email,
    password,
    name,
    address,
    whatsApp_number,
  }: RegisterServicesProps): Promise<RegisterServicesResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmailExists = await this.orgRepository.findOrgByEmail(
      email
    );

    if (orgWithSameEmailExists) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgRepository.createOrg({
      email,
      password_hash,
      name,
      address,
      whatsApp_number,
    });

    return { org };
  }
}
