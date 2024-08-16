import { AttachmentRepository } from "@/domain/carrier/application/repositories/attachment-repository";
import { Attachment } from "@/domain/carrier/enterprise/entities/attachment";

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = [];

  async findByPackageId(packageId: string): Promise<Attachment | null> {
    const attachment = this.items.find(
      (item) => item.packageId.toString() === packageId
    );

    if (!attachment) return null;

    return attachment;
  }

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
