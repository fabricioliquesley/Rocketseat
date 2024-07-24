import { AttachmentRepository } from "@/domain/forum/application/repositories/attachment-repository";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";

export class InMemoryAttachmentRepository extends AttachmentRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
