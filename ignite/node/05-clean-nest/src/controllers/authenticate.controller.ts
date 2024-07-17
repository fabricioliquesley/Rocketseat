import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const doesThePasswordMatch = await compare(password, user.password);

    if (!doesThePasswordMatch) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const accessToken = this.jwt.sign({
      sub: user.id,
    });

    return { access_token: accessToken };
  }
}
