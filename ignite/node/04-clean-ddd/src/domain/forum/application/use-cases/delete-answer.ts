import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswersUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswersUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answer = await this.questionsRepository.findById(answerId);

    if (!answer) {
      throw new Error("Question not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("This user is not the author of this answer");
    }

    await this.questionsRepository.delete(answer);

    return {};
  }
}
