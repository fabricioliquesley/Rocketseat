import { Either, left, right } from "@/core/either";
import { PackageRepository } from "../repositories/package-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

export interface UpdatePackageUseCaseRequest {
  code?: string;
  type?: string;
  recipientId?: UniquesEntityId;
  packageId: UniquesEntityId;
  adminId: UniquesEntityId;
}

type UpdatePackageUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError | UserAlreadyExistsError,
  {}
>;

export class UpdatePackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    code,
    type,
    recipientId,
    packageId,
    adminId,
  }: UpdatePackageUseCaseRequest): Promise<UpdatePackageUseCaseResponse> {
    const _package = await this.packageRepository.findById(
      packageId.toString()
    );

    if (!_package) {
      return left(new ResourceNotFoundError());
    }

    const userAdmin = await this.adminRepository.findById(adminId.toString());

    if (userAdmin.role !== "admin") {
      return left(new UserIsNotAdminError(adminId.toValue()));
    }

    _package.code = code ?? _package.code;
    _package.type = type ?? _package.type;
    _package.recipientId = recipientId ?? _package.recipientId;

    await this.packageRepository.save(_package);

    return right({});
  }
}
