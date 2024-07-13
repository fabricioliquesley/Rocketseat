import { AnswersRepository } from "../repositories/answers-repository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found!");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found!");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Unauthorized");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
