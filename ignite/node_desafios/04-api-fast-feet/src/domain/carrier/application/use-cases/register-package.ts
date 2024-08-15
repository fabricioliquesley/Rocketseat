import { Either, left, right } from "@/core/either";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { RecipientRepository } from "../repositories/recipient-repository";
import { Package } from "../../enterprise/entities/package";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PackageRepository } from "../repositories/package-repository";

export interface RegisterPackageUseCaseRequest {
  code: string;
  type: string;
  recipientId: UniquesEntityId;
  latitude: number;
  longitude: number;
}

type RegisterPackageUseCaseResponse = Either<
  ResourceNotFoundError,
  { package: Package }
>;

export class RegisterPackageUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private packageRepository: PackageRepository
  ) {}

  async execute({
    code,
    type,
    recipientId,
    latitude,
    longitude,
  }: RegisterPackageUseCaseRequest): Promise<RegisterPackageUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(
      recipientId.toString()
    );

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    const _package = Package.create({
      code,
      type,
      recipientId,
      latitude,
      longitude,
    });

    await this.packageRepository.create(_package);

    return right({
      package: _package,
    });
  }
}
