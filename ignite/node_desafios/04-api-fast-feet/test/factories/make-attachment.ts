import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import {
  Attachment,
  AttachmentProps,
} from "@/domain/carrier/enterprise/entities/attachment";
import { faker } from "@faker-js/faker";

export function makeAttachment(
  packageId: UniquesEntityId,
  override?: Partial<Omit<AttachmentProps, "packageId">>,
  id?: UniquesEntityId
) {
  const attachment = Attachment.create(
    {
      name: faker.lorem.sentence(),
      link: faker.lorem.slug(),
      ...override,
      packageId,
    },
    id
  );

  return attachment;
}
