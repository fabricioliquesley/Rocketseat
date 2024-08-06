import { UniquesEntityId } from "./unique-entity-id";

export class Entity<Props> {
  private _id: UniquesEntityId;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: UniquesEntityId) {
    this.props = props;
    this._id = id ?? new UniquesEntityId();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
