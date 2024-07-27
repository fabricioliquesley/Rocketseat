import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { InMemoryStudentsRepository } from "./in-memory-student-repository";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";
import { InMemoryAttachmentRepository } from "./in-memory-attachment-repository";
import { InMemoryQuestionAttachmentsRepository } from "./in-memory-question-attachments-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentRepository,
    private studentRepository: InMemoryStudentsRepository
  ) {}

  async findById(questionId: string) {
    const question = this.items.find(
      (item) => item.id.toString() === questionId
    );

    if (!question) return null;

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    return question;
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    const author = this.studentRepository.items.find((student) =>
      student.id.equals(question.authorId)
    );

    if (!author)
      throw new Error(
        `Author with id "${question.authorId.toString()}" does not exist`
      );

    const attachments = this.questionAttachmentsRepository.items
      .filter((attachment) => {
        return attachment.questionId.equals(question.id);
      })
      .map((questionAttachment) => {
        const attachment = this.attachmentsRepository.items.find(
          (attachment) => {
            return attachment.id.equals(questionAttachment.attachmentId);
          }
        );

        if (!attachment)
          throw new Error(
            `Attachment with id "${questionAttachment.attachmentId.toString()}" does not exist`
          );

        return attachment;
      });

    return QuestionDetails.create({
      questionId: question.id,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      author: author,
      attachments: attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });
  }

  async findMany({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async create(question: Question) {
    this.items.push(question);

    this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id !== question.id
    );

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    );

    this.items.splice(questionIndex, 1);
  }

  async save(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id !== question.id
    );

    this.items[questionIndex] = question;

    this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems()
    );

    this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems()
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }
}
