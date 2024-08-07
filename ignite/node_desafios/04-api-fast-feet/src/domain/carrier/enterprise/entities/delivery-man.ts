import { Entity } from "src/core/entities/entity";
import { UniquesEntityId } from "src/core/entities/unique-entity-id";

export interface DeliveryManProps {
  name: string;
  cpf: string;
  password: string;
  role?: string;
}

export class DeliveryMan extends Entity<DeliveryManProps> {
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
    { name, cpf, password }: Omit<DeliveryManProps, "role">,
    id?: UniquesEntityId
  ) {
    const deliveryMan = new DeliveryMan(
      { name, cpf, password, role: "delivery-man" },
      id
    );

    return deliveryMan;
  }
}
