import { DeliveryManRepository } from "@/domain/carrier/application/repositories/delivery-man-repository";
import { DeliveryMan } from "@/domain/carrier/enterprise/entities/delivery-man";

export class InMemoryDeliveryManRepository implements DeliveryManRepository {
  public items: DeliveryMan[] = [];

  async findByCPF(cpf: string): Promise<DeliveryMan> {
    const deliveryMan = this.items.find(
      (deliveryMan) => deliveryMan.cpf === cpf
    );

    if (!deliveryMan) return null;

    return deliveryMan;
  }

  async create(deliveryMan: DeliveryMan): Promise<void> {
    this.items.push(deliveryMan);
  }

  async delete(deliveryMan: DeliveryMan): Promise<void> {
    const index = this.items.findIndex((item) => item.id === deliveryMan.id);
    
    this.items.splice(index, 1);
  }

  async save(deliveryMan: DeliveryMan): Promise<void> {
    const index = this.items.findIndex((item) => item.id === deliveryMan.id);

    this.items[index] = deliveryMan;
  }
}
