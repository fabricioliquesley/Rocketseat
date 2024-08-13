import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { AdminRepository } from "../repositories/admin-repository";
import { PasswordNotMatchError } from "./errors/password-not-match-error";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";

export interface ChangeUserPasswordUseCaseRequest {
  userId: UniquesEntityId;
  adminId: UniquesEntityId;
  currentPassword: string;
  newPassword: string;
}

type ChangeUserPasswordUseCaseResponse = Either<
  ResourceNotFoundError | PasswordNotMatchError,
  {}
>;

export class ChangeUserPasswordUseCase {
  constructor(
    private userRepository: DeliveryManRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    userId,
    adminId,
    currentPassword,
    newPassword,
  }: ChangeUserPasswordUseCaseRequest): Promise<ChangeUserPasswordUseCaseResponse> {
    const user = await this.userRepository.findById(userId.toString());

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    const admin = await this.adminRepository.findById(adminId.toString());

    if (admin) {
      if (admin.role !== "admin") {
        return left(new UserIsNotAdminError(adminId.toString()));
      }
    } else {
      return left(new ResourceNotFoundError());
    }

    if (currentPassword !== user.password) {
      return left(new PasswordNotMatchError());
    }

    user.password = newPassword;

    this.userRepository.save(user);

    return right({});
  }
}
