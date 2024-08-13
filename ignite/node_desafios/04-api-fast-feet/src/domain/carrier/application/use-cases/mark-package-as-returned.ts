import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";
import { PackageRepository } from "../repositories/package-repository";
import { AdminRepository } from "../repositories/admin-repository";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

export interface markPackageAsReturnedRequest {
  packageId: UniquesEntityId;
  adminId: UniquesEntityId;
}

type MarkPackageAsReturnedResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError,
  {}
>;

export class MarkPackageAsReturnedUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    packageId,
    adminId,
  }: markPackageAsReturnedRequest): Promise<MarkPackageAsReturnedResponse> {
    const _package = await this.packageRepository.findById(
      packageId.toString()
    );

    if (!_package) {
      return left(new ResourceNotFoundError());
    }

    const admin = await this.adminRepository.findById(adminId.toString());

    if (admin.role !== "admin") {
      return left(new UserIsNotAdminError(admin.id.toString()));
    }

    _package.changeSituation("returned");

    await this.packageRepository.save(_package);

    return right({});
  }
}
