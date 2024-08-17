import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { AdminRepository } from "../repositories/admin-repository";
import { UserIsNotAdminError } from "./errors/user-is-not-admin-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export interface UpdateDeliveryManUseCaseRequest {
  name?: string;
  cpf?: string;
  deliveryManCPF: string;
  adminCPF: string;
}

type UpdateDeliveryManUseCaseResponse = Either<
  ResourceNotFoundError | UserIsNotAdminError | UserAlreadyExistsError,
  {}
>;

export class UpdateDeliveryManUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute({
    name,
    cpf,
    deliveryManCPF,
    adminCPF,
  }: UpdateDeliveryManUseCaseRequest): Promise<UpdateDeliveryManUseCaseResponse> {
    const deliveryMan = await this.deliveryManRepository.findByCPF(
      deliveryManCPF
    );

    if (!deliveryMan) {
      return left(new ResourceNotFoundError());
    }

    if (cpf) {
      const deliveryManWithSameCpf = await this.deliveryManRepository.findByCPF(
        cpf
      );
      const adminWithSameCpf = await this.adminRepository.findByCPF(cpf);

      if (deliveryManWithSameCpf || adminWithSameCpf) {
        return left(new UserAlreadyExistsError());
      }
    }

    const userAdmin = await this.adminRepository.findByCPF(adminCPF);

    if (userAdmin.role !== "admin") {
      return left(new UserIsNotAdminError(adminCPF));
    }

    deliveryMan.name = name ?? deliveryMan.name;
    deliveryMan.cpf = cpf ?? deliveryMan.cpf;

    await this.deliveryManRepository.save(deliveryMan);

    return right({});
  }
}
