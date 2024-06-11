import { OrgsRepository } from "@/repositories/orgs-repository";
import { invalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Org } from "@prisma/client";

interface AuthenticateServiceProps {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  org: Org;
}

export class AuthenticateService {
  constructor(private orgRepository: OrgsRepository) {}

  async executeAuthenticate({
    email,
    password,
  }: AuthenticateServiceProps): Promise<AuthenticateServiceResponse> {
    const org = await this.orgRepository.findOrgByEmail(email);

    if (!org) throw new invalidCredentialsError();

    const passwordsAreSame = await compare(password, org.password_hash);

    if (!passwordsAreSame) throw new invalidCredentialsError();

    return {
      org,
    };
  }
}
