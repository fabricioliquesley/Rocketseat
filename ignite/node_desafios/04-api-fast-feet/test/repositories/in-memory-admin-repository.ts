import { AdminRepository } from "@/domain/carrier/application/repositories/admin-repository";
import { Admin } from "@/domain/carrier/enterprise/entities/admin";

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = [];

  async create(admin: Admin): Promise<void> {
    this.items.push(admin);
  }

  async findByCPF(cpf: string): Promise<Admin> {
    const admin = this.items.find((admin) => admin.cpf === cpf);

    if (!admin) return null;

    return admin;
  }

  async findById(id: string): Promise<Admin> {
    const admin = this.items.find((admin) => admin.id.toString() === id);

    if (!admin) return null;

    return admin;
  }
}
