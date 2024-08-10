import { RecipientRepository } from "@/domain/carrier/application/repositories/recipient-repository";
import { Recipient } from "@/domain/carrier/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = [];

  async findById(id: string): Promise<any> {
    const recipient = this.items.find((item) => item.id.toString() === id);

    return recipient;
  }

  async findByCPF(cpf: string): Promise<Recipient> {
    const recipient = this.items.find((item) => item.cpf === cpf);

    return recipient;
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient);
  }

  async delete(recipient: Recipient): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(recipient.id));

    this.items.splice(index, 1);
  }

  async save(recipient: Recipient): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(recipient.id));

    this.items[index] = recipient;
  }
}
