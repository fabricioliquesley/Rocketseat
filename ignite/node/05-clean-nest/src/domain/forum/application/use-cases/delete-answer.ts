import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "@/core/errors/use-case-errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface DeleteAnswersUseCaseRequest {
  answerId: string;
  authorId: string;
}

type DeleteAnswersUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answer = await this.questionsRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsRepository.delete(answer);

    return right(null);
  }
}
