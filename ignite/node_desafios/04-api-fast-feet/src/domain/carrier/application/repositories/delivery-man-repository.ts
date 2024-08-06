import { DeliveryMan } from "../../enterprise/entities/delivery-man";

export abstract class DeliveryManRepository {
  abstract create(deliveryMan: DeliveryMan): Promise<void>;
  abstract findByCPF(cpf: string): Promise<DeliveryMan | null>;
}
