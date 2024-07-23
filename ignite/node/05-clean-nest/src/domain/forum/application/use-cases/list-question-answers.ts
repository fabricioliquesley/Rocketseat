import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { Injectable } from "@nestjs/common";

interface ListQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type ListQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;

@Injectable()
export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return right({ answers });
  }
}
