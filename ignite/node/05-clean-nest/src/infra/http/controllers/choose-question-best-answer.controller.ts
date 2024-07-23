import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ChooseBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-best-answer";

@Controller("/answers/:answerId/choose-as-best")
export class ChooseQuestionBestAnswerController {
  constructor(private chooseBestAnswer: ChooseBestAnswerUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param("answerId") answerId: string
  ) {
    const authorId = user.sub;

    const result = await this.chooseBestAnswer.execute({
      authorId,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
