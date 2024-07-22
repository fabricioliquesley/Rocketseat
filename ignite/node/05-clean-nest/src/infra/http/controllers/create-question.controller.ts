import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";

const requestBodySchema = z.object({
  title: z.string().max(40),
  content: z.string(),
});

type RequestBodySchema = z.infer<typeof requestBodySchema>;

@Controller("/questions")
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(requestBodySchema)) body: RequestBodySchema
  ) {
    const { title, content } = body;
    const authorId = user.sub;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
