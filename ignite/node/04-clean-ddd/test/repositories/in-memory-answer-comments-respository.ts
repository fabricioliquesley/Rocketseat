import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-reposiotory";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(answerCommentId: string) {
    const answerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId
    );

    if (!answerComment) return null;

    return answerComment;
  }

  async findManyByAnswerId(id: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = await this.items.findIndex(
      (item) => item.id !== answerComment.id
    );

    this.items.splice(answerCommentIndex, 1);
  }
}
