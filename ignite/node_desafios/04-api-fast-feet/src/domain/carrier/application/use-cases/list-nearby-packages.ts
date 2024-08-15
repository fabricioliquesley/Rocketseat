import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { Package } from "../../enterprise/entities/package";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { PackageRepository } from "../repositories/package-repository";

export interface ListNearbyPackagesUseCaseRequest {
  deliveryId: UniquesEntityId;
  deliveryManLatitude: number;
  deliveryManLongitude: number;
  page: number;
}

type ListNearbyPackagesUseCaseResponse = Either<
  ResourceNotFoundError,
  { packages: Package[] }
>;

export class ListNearbyPackagesUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private packageRepository: PackageRepository
  ) {}

  async execute({
    deliveryId,
    deliveryManLatitude,
    deliveryManLongitude,
    page,
  }: ListNearbyPackagesUseCaseRequest): Promise<ListNearbyPackagesUseCaseResponse> {
    const deliveryMan = await this.deliveryManRepository.findById(
      deliveryId.toString()
    );

    if (!deliveryMan) return left(new ResourceNotFoundError());

    const packages = await this.packageRepository.findManyNearby(
      {
        deliveryManId: deliveryMan.id.toString(),
        latitude: deliveryManLatitude,
        longitude: deliveryManLongitude,
      },
      { page }
    );

    if (!packages) return left(new ResourceNotFoundError());

    return right({
      packages,
    });
  }
}
