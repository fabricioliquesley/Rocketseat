import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AnswerFactory } from "test/factories/make-answer";
import { AnswerAttachmentFactory } from "test/factories/make-answer-attachment";
import { AttachmentFactory } from "test/factories/make-attachment";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Edit Answer (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;
  let attachmentFactory: AttachmentFactory;
  let answerAttachmentFactory: AnswerAttachmentFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AttachmentFactory,
        AnswerAttachmentFactory,
      ],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);
    studentFactory = noduleRef.get(StudentFactory);
    questionFactory = noduleRef.get(QuestionFactory);
    answerFactory = noduleRef.get(AnswerFactory);
    attachmentFactory = noduleRef.get(AttachmentFactory);
    answerAttachmentFactory = noduleRef.get(AnswerAttachmentFactory);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[PUT] answers/:answerId", async () => {
    const user = await studentFactory.makePrismaStudent();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    });

    await answerAttachmentFactory.makePrismaAnswerAttachment({
      answerId: answer.id,
      attachmentId: attachment1.id,
    });

    await answerAttachmentFactory.makePrismaAnswerAttachment({
      answerId: answer.id,
      attachmentId: attachment2.id,
    });

    const attachment3 = await attachmentFactory.makePrismaAttachment();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .put(`/answers/${answer.id.toString()}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        content: "Updated answer!",
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      });

    expect(response.statusCode).toBe(204);

    const answerOnDataBase = await prisma.answer.findFirst({
      where: {
        content: "Updated answer!",
      },
    });

    expect(answerOnDataBase).toBeTruthy();

    const attachmentsOnDataBase = await prisma.attachment.findMany({
      where: {
        answerId: answer.id.toString(),
      },
    });

    expect(attachmentsOnDataBase).toHaveLength(2);
    expect(attachmentsOnDataBase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: attachment1.id.toString()}),
        expect.objectContaining({id: attachment3.id.toString()}),
      ])
    )
  });
});
