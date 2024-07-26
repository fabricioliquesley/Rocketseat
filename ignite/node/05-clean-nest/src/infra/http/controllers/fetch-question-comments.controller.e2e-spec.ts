import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { QuestionCommentFactory } from "test/factories/make-question-comment";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Fetch Question Comments (E2E)", () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let questionCommentFactory: QuestionCommentFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile();

    app = noduleRef.createNestApplication();
    studentFactory = noduleRef.get(StudentFactory);
    questionFactory = noduleRef.get(QuestionFactory);
    questionCommentFactory = noduleRef.get(QuestionCommentFactory);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[GET] /questions/:questionId/comments", async () => {
    const user = await studentFactory.makePrismaStudent({
      name: "Will Smith",
    });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    await Promise.all([
      questionCommentFactory.makePrismaQuestionComment({
        questionId: question.id,
        authorId: user.id,
        content: "Comment 01",
      }),
      questionCommentFactory.makePrismaQuestionComment({
        questionId: question.id,
        authorId: user.id,
        content: "Comment 02",
      }),
      questionCommentFactory.makePrismaQuestionComment({
        questionId: question.id,
        authorId: user.id,
        content: "Comment 03",
      }),
    ]);

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .get(`/questions/${question.id.toString()}/comments`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: "Comment 03",
          author: expect.objectContaining({ name: user.name }),
        }),
        expect.objectContaining({
          content: "Comment 02",
          author: expect.objectContaining({ name: user.name }),
        }),
        expect.objectContaining({
          content: "Comment 01",
          author: expect.objectContaining({ name: user.name }),
        }),
      ]),
    });
  });
});
