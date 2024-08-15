import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { Package } from "../../enterprise/entities/package";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { PackageRepository } from "../repositories/package-repository";

export interface ListDeliveredPackagesUseCaseRequest {
  deliveryId: UniquesEntityId;
  page: number;
}

type ListDeliveredPackagesUseCaseResponse = Either<
  ResourceNotFoundError,
  { packages: Package[] }
>;

export class ListDeliveredPackagesUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private packageRepository: PackageRepository
  ) {}

  async execute({
    deliveryId,
    page,
  }: ListDeliveredPackagesUseCaseRequest): Promise<ListDeliveredPackagesUseCaseResponse> {
    const deliveryMan = await this.deliveryManRepository.findById(
      deliveryId.toString()
    );

    if (!deliveryMan) return left(new ResourceNotFoundError());

    const packages = await this.packageRepository.findManyByDeliveryManId(
      deliveryMan.id.toString(),
      { page }
    );

    if (!packages) return left(new ResourceNotFoundError());

    return right({
      packages,
    });
  }
}
