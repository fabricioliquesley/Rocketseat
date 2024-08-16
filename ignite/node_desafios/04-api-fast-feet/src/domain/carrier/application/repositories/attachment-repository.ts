import { Attachment } from "../../enterprise/entities/attachment";

export abstract class AttachmentRepository {
  abstract findByPackageId(packageId: string): Promise<Attachment | null>;
  abstract create(attachment: Attachment): Promise<void>;
}
