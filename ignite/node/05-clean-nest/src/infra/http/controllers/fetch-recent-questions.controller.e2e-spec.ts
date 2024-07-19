import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Fetch Recent Questions (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[GET] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@doe.com",
        password: "123456",
      },
    });

    await prisma.question.createMany({
      data: [
        {
          title: "My question",
          slug: "my-question",
          content: "question content",
          authorId: user.id,
        },
        {
          title: "My other question",
          slug: "my-other-question",
          content: "question content",
          authorId: user.id,
        },
        {
          title: "My new other question",
          slug: "my-new-other-question",
          content: "question content",
          authorId: user.id,
        },
      ],
    });

    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .get("/questions")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: "My question" }),
        expect.objectContaining({ title: "My other question" }),
        expect.objectContaining({ title: "My new other question" }),
      ],
    });
  });
});
