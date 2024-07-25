import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";

const requestBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

type RequestBodySchema = z.infer<typeof requestBodySchema>;

@Controller("/questions/:questionId/answers")
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(requestBodySchema)) body: RequestBodySchema,
    @Param("questionId") questionId: string
  ) {
    const { content, attachments } = body;
    const authorId = user.sub;

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
