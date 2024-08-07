import { Admin } from "../../enterprise/entities/admin";

export abstract class AdminRepository {
  abstract findByCPF(cpf: string): Promise<Admin | null>;
  abstract create(admin: Admin): Promise<void>;
}
