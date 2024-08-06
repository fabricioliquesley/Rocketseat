import { randomUUID } from "node:crypto";

export class UniquesEntityId {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  public equals(id: UniquesEntityId) {
    return id.toValue() === this.value;
  }
}
