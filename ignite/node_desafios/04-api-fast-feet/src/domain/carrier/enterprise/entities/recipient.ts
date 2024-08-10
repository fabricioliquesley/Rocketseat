import { Entity } from "@/core/entities/entity";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

export interface RecipientProps {
  name: string;
  cpf: string;
  password: string;
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get cpf() {
    return this.props.cpf;
  }

  set cpf(value: string) {
    this.props.cpf = value;
  }

  get password() {
    return this.props.password;
  }

  static create(props: RecipientProps, id?: UniquesEntityId) {
    const recipient = new Recipient({ ...props }, id);

    return recipient;
  }
}
