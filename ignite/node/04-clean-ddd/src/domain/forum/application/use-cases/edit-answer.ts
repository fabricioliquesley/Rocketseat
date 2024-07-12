import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found!");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Invalid author!");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}
