import { DeliveryManRepository } from "@/domain/carrier/application/repositories/delivery-man-repository";
import { DeliveryMan } from "@/domain/carrier/enterprise/entities/delivery-man";

export class InMemoryDeliveryManRepository implements DeliveryManRepository {
  public items: DeliveryMan[] = [];

  async create(deliveryMan: DeliveryMan): Promise<void> {
    this.items.push(deliveryMan);
  }

  async findByCPF(cpf: string): Promise<DeliveryMan> {
    const deliveryMan = this.items.find(
      (deliveryMan) => deliveryMan.cpf === cpf
    );

    if (!deliveryMan) return null;

    return deliveryMan;
  }
}
