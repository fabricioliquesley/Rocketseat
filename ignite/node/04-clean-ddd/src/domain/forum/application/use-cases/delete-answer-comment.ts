import { AnswerCommentsRepository } from "../repositories/answer-comments-reposiotory";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) throw new Error("Comment not found!");

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Unauthorized")
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
