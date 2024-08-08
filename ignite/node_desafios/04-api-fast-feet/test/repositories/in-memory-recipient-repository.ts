import { RecipientRepository } from "@/domain/carrier/application/repositories/recipient-repository";
import { Recipient } from "@/domain/carrier/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = [];

  async findById(id: string): Promise<any> {
    const recipient = this.items.find((item) => item.id.toString() === id);

    return recipient;
  }
}
