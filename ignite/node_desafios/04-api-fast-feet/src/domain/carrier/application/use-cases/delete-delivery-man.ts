import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";

export interface DeleteDeliveryManUseCaseRequest {
  deliveryManCPF: string;
  adminCPF: string;
}

type DeleteDeliveryManUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError,
  {}
>;

export class DeleteDeliveryManUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    deliveryManCPF,
    adminCPF,
  }: DeleteDeliveryManUseCaseRequest): Promise<DeleteDeliveryManUseCaseResponse> {
    const deliveryMan = await this.deliveryManRepository.findByCPF(
      deliveryManCPF
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    const userAdmin = await this.adminRepository.findByCPF(adminCPF);

    if (userAdmin.role !== "admin") {
      return left(new UserIsNotAdminError(adminCPF));
    }

    await this.deliveryManRepository.delete(deliveryMan);

    return right({});
  }
}
