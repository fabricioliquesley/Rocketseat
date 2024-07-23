import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/use-cases/delete-question-comment";

@Controller("/questions/comments/:id")
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param("id") questionCommentId: string
  ) {
    const authorId = user.sub;

    const result = await this.deleteQuestionComment.execute({
      authorId,
      questionCommentId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
