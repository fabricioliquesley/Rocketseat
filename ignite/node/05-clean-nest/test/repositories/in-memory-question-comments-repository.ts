import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { InMemoryStudentsRepository } from "./in-memory-student-repository";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  constructor(private studentRepository: InMemoryStudentsRepository) {}

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

  async findManyByQuestionIdWithAuthor(id: string, { page }: PaginationParams) {
    const questionComment = await this.items
      .filter((item) => item.questionId.toString() === id)
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
