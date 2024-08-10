import { Either, left, right } from "@/core/either";
import { RecipientRepository } from "../repositories/recipient-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";

export interface DeleteRecipientUseCaseRequest {
  recipientCPF: string;
  adminCPF: string;
}

type DeleteRecipientUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError,
  {}
>;

export class DeleteRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    recipientCPF,
    adminCPF,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findByCPF(
      recipientCPF
    );

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    const userAdmin = await this.adminRepository.findByCPF(adminCPF);

    if (userAdmin.role !== "admin") {
      return left(new UserIsNotAdminError(adminCPF));
    }

    await this.recipientRepository.delete(recipient);

    return right({});
  }
}
