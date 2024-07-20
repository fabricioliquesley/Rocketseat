import { Either, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Injectable } from "@nestjs/common";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<
  null,
  { questions: Question[] }
>;

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findMany({ page });

    return right({ questions });
  }
}
