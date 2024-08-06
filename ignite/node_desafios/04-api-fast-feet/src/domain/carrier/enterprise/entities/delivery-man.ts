import { Entity } from "src/core/entities/entity";
import { UniquesEntityId } from "src/core/entities/unique-entity-id";

export interface DeliveryManProps {
  name: string;
  cpf: string;
  password: string;
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

  static create(props: DeliveryManProps, id?: UniquesEntityId) {
    const deliveryMan = new DeliveryMan(props, id);

    return deliveryMan;
  }
}
