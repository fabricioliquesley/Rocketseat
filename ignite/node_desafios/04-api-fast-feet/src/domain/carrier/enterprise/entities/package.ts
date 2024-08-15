import { Entity } from "@/core/entities/entity";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

type Situation = "on_hold" | "delivered" | "returned";

export interface PackageProps {
  code: string;
  type: string;
  situation: Situation;
  recipientId: UniquesEntityId;
  deliveryManId: UniquesEntityId;
  latitude: number;
  longitude: number;
  withdrawalAt?: Date;
  returnedAt?: Date;
  deliveredAt?: Date;
  updatedAt?: Date;
}

export class Package extends Entity<PackageProps> {
  get code() {
    return this.props.code;
  }

  set code(value: string) {
    this.props.code = value;
  }

  get type() {
    return this.props.type;
  }

  set type(value: string) {
    this.props.type = value;
  }

  get situation() {
    return this.props.situation;
  }

  get deliveryManId() {
    return this.props.deliveryManId;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  set recipientId(value: UniquesEntityId) {
    this.props.recipientId = value;
  }

  get withdrawalAt() {
    return this.props.withdrawalAt;
  }

  get returnedAt() {
    return this.props.returnedAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private changeUpdatedAt() {
    this.props.updatedAt = new Date();
  }

  public changeSituation(value: Situation) {
    this.props.situation = value;
    this.changeUpdatedAt();
  }

  public registerDeliveryMan(deliveryManId: UniquesEntityId) {
    this.props.deliveryManId = deliveryManId;
    this.changeUpdatedAt();
  }

  public markAsWithdrawn() {
    this.props.withdrawalAt = new Date();
    this.changeUpdatedAt();
  }

  public markAsReturned() {
    this.props.returnedAt = new Date();
    this.changeUpdatedAt();
  }

  public markAsDelivered() {
    this.props.deliveredAt = new Date();
    this.changeUpdatedAt();
  }

  static create(
    props: Omit<
      PackageProps,
      | "situation"
      | "deliveryManId"
      | "withdrawalAt"
      | "deliveredAt"
      | "returnedAt"
      | "updatedAt"
    >,
    id?: UniquesEntityId
  ) {
    const _package = new Package(
      { situation: "on_hold", deliveryManId: new UniquesEntityId(), ...props },
      id
    );

    return _package;
  }
}
