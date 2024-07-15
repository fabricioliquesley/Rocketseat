import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = await this.items.find(
      (answer) => answer.id.toString() === id
    );

    if (!answer) return null;

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = await this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const answerIndex = await this.items.findIndex(
      (item) => item.id === answer.id
    );

    await this.items.splice(answerIndex, 1);
    await this.answerAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString()
    );
  }

  async save(answer: Answer) {
    const answerIndex = await this.items.findIndex(
      (item) => item.id === answer.id
    );

    this.items[answerIndex] = answer;
  }
}
