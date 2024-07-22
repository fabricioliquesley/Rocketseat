import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Get question by slug (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);
    studentFactory = noduleRef.get(StudentFactory);
    questionFactory = noduleRef.get(QuestionFactory);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[GET] /questions/:", async () => {
    const user = await studentFactory.makePrismaStudent();

    await questionFactory.makePrismaQuestion({
      title: "My question",
      authorId: user.id,
    });

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get("/questions/my-question")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      question: expect.objectContaining({ title: "My question" }),
    });
  });
});
