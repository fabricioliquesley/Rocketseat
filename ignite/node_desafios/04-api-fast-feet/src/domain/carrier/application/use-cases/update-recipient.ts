import { Either, left, right } from "@/core/either";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export interface UpdateRecipientUseCaseRequest {
  name?: string;
  cpf?: string;
  recipientCPF: string;
  adminCPF: string;
}

type UpdateRecipientUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError | UserAlreadyExistsError,
  {}
>;

export class UpdateRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    name,
    cpf,
    recipientCPF,
    adminCPF,
  }: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findByCPF(recipientCPF);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    if (cpf) {
      const recipientWithSameCpf = await this.recipientRepository.findByCPF(
        cpf
      );
      const adminWithSameCpf = await this.adminRepository.findByCPF(cpf);

      if (recipientWithSameCpf || adminWithSameCpf) {
        return left(new UserAlreadyExistsError());
      }
    }

    const userAdmin = await this.adminRepository.findByCPF(adminCPF);

    if (userAdmin.role !== "admin") {
      return left(new UserIsNotAdminError(adminCPF));
    }

    recipient.name = name ?? recipient.name;
    recipient.cpf = cpf ?? recipient.cpf;

    await this.recipientRepository.save(recipient);

    return right({});
  }
}
