import { RegisterRecipientUseCase } from "@/domain/carrier/application/use-cases/register-recipient";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UserAlreadyExistsError } from "@/domain/carrier/application/use-cases/errors/user-already-exists-error";

const requestBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string().min(6),
});

type RequestBodySchema = z.infer<typeof requestBodySchema>;

@Controller("/users")
export class RegisterUser {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}

  @Post("/recipient")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(requestBodySchema))
  async handle(@Body() body: RequestBodySchema) {
    const { name, password, cpf } = body;

    const result = await this.registerRecipient.execute({
      name,
      password,
      cpf,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return result.value;
  }
}
