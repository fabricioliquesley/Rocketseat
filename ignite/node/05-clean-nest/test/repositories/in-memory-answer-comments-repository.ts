import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";
import { InMemoryStudentsRepository } from "./in-memory-student-repository";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private studentRepository: InMemoryStudentsRepository) {}

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

  async findManyByAnswerIdWithAuthor(id: string, { page }: PaginationParams) {
    const answerComment = await this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentRepository.items.find((student) => {
          return student.id === comment.authorId;
        });

        if (!author) {
          throw new Error(
            `Author with id ${comment.authorId.toString()} not found!`
          );
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          authorId: comment.authorId,
          authorName: author.name,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        });
      });

    return answerComment;
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);

    DomainEvents.dispatchEventsForAggregate(answerComment.id);
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = await this.items.findIndex(
      (item) => item.id !== answerComment.id
    );

    this.items.splice(answerCommentIndex, 1);
  }
}
