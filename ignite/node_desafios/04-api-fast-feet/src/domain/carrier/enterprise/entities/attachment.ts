import { Entity } from "@/core/entities/entity";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";

export interface AttachmentProps {
  name: string;
  link: string;
  packageId: UniquesEntityId;
}

export class Attachment extends Entity<AttachmentProps> {
  get name() {
    return this.props.name;
  }

  get link() {
    return this.props.link;
  }

  get packageId() {
    return this.props.packageId;
  }

  static create(
    { name, link, packageId }: AttachmentProps,
    id?: UniquesEntityId
  ) {
    const attachment = new Attachment(
      {
        name,
        link,
        packageId,
      },
      id
    );

    return attachment;
  }
}
