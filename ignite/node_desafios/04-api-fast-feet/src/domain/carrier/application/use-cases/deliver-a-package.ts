import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PackageRepository } from "../repositories/package-repository";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { DeliveryManNotMatchError } from "./errors/delivery-man-not-match-error";
import { AttachmentRepository } from "../repositories/attachment-repository";

export interface DeliverAPackageUseCaseRequest {
  packageId: UniquesEntityId;
  deliveryManId: UniquesEntityId;
}

type DeliverAPackageUseCaseResponse = Either<
  ResourceNotFoundError | DeliveryManNotMatchError,
  {}
>;

export class DeliverAPackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private deliveryManRepository: DeliveryManRepository,
    private attachmentRepository: AttachmentRepository
  ) {}

  async execute({
    packageId,
    deliveryManId,
  }: DeliverAPackageUseCaseRequest): Promise<DeliverAPackageUseCaseResponse> {
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

    if (_package.deliveryManId !== deliveryManId) {
      return left(new DeliveryManNotMatchError());
    }

    const packageAttachment = await this.attachmentRepository.findByPackageId(
      packageId.toString()
    );

    if (!packageAttachment) {
      return left(new ResourceNotFoundError());
    }

    _package.changeSituation("delivered");

    await this.packageRepository.save(_package);

    return right({});
  }
}
