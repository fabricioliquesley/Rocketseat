import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
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

  async findMany({ page }: PaginationParams) {
    const questions = await this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async create(question: Question) {
    this.items.push(question);

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async delete(question: Question) {
    const questionIndex = await this.items.findIndex(
      (item) => item.id !== question.id
    );

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    );
    
    this.items.splice(questionIndex, 1);
  }

  async save(question: Question) {
    const questionIndex = await this.items.findIndex(
      (item) => item.id !== question.id
    );

    this.items[questionIndex] = question;
    DomainEvents.dispatchEventsForAggregate(question.id);
  }
}
