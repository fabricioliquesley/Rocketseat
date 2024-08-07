import { Entity } from "@/core/entities/entity";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

export interface AdminProps {
  name: string;
  cpf: string;
  password: string;
  role?: string;
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  static create(
    { name, cpf, password }: Omit<AdminProps, "role">,
    id?: UniquesEntityId
  ) {
    const admin = new Admin({ name, cpf, password, role: "admin" }, id);

    return admin;
  }
}
