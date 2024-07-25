import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";

const requestBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

type RequestBodySchema = z.infer<typeof requestBodySchema>;

@Controller("/answers/:id")
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(requestBodySchema)) body: RequestBodySchema,
    @Param("id") answerId: string
  ) {
    const { content, attachments } = body;
    const authorId = user.sub;

    const result = await this.editAnswer.execute({
      content,
      authorId,
      attachmentsIds: attachments,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
