import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PackageRepository } from "../repositories/package-repository";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";

export interface DeletePackageUseCaseRequest {
  packageId: UniquesEntityId;
  adminId: UniquesEntityId;
}

type DeletePackageUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError,
  {}
>;

export class DeletePackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    packageId,
    adminId,
  }: DeletePackageUseCaseRequest): Promise<DeletePackageUseCaseResponse> {
    const _package = await this.packageRepository.findById(
      packageId.toString()
    );

    if (!_package) {
      return left(new ResourceNotFoundError());
    }

    const admin = await this.adminRepository.findById(adminId.toString());

    if (admin.role !== "admin") {
      return left(new UserIsNotAdminError(adminId.toString()));
    }

    await this.packageRepository.delete(_package);

    return right({});
  }
}
