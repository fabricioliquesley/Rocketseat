import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(questionCommentId: string) {
    const questionComment = this.items.find(
      (item) => item.id.toString() === questionCommentId
    );

    if (!questionComment) return null;

    return questionComment;
  }

  async findManyByQuestionId(id: string, { page }: PaginationParams) {
    const questionComment = await this.items
      .filter((item) => item.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20);

    return questionComment;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);

    DomainEvents.dispatchEventsForAggregate(questionComment.id);
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = await this.items.findIndex(
      (item) => item.id !== questionComment.id
    );

    this.items.splice(questionCommentIndex, 1);
  }
}
