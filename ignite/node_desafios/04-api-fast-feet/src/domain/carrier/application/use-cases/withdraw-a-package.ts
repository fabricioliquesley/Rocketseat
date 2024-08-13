import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PackageRepository } from "../repositories/package-repository";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";

export interface WithdrawAPackageUseCaseRequest {
  packageId: UniquesEntityId;
  deliveryManId: UniquesEntityId;
}

type WithdrawAPackageUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class WithdrawAPackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private deliveryManRepository: DeliveryManRepository
  ) {}

  async execute({
    packageId,
    deliveryManId,
  }: WithdrawAPackageUseCaseRequest): Promise<WithdrawAPackageUseCaseResponse> {
    const _package = await this.packageRepository.findById(
      packageId.toString()
    );

    if (!_package) {
      return left(new ResourceNotFoundError());
    }

    const deliveryMan = await this.deliveryManRepository.findById(
      deliveryManId.toString()
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    _package.registerDeliveryMan(deliveryMan.id);

    await this.packageRepository.save(_package);

    return right({});
  }
}
