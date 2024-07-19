import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod";

const requestBodySchema = z.object({
  title: z.string().max(40),
  content: z.string(),
});

type RequestBodySchema = z.infer<typeof requestBodySchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(requestBodySchema)) body: RequestBodySchema
  ) {
    const { title, content } = body;
    const authorId = user.sub;

    const slug = this.convertToSlug(title);

    await this.prisma.question.create({
      data: {
        title,
        slug,
        content,
        authorId,
      },
    });
  }

  private convertToSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
}
