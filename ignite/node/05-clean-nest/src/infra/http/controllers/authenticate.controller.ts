import {
  Body,
  Controller,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({ email, password });

    if (result.isLeft()) throw new Error();

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
