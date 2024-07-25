import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AttachmentFactory } from "test/factories/make-attachment";
import { QuestionFactory } from "test/factories/make-question";
import { QuestionAttachmentFactory } from "test/factories/make-question-attachment";
import { StudentFactory } from "test/factories/make-student";

describe("Edit Question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let attachmentFactory: AttachmentFactory;
  let questionAttachmentFactory: QuestionAttachmentFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);
    studentFactory = noduleRef.get(StudentFactory);
    questionFactory = noduleRef.get(QuestionFactory);
    attachmentFactory = noduleRef.get(AttachmentFactory);
    questionAttachmentFactory = noduleRef.get(QuestionAttachmentFactory);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[PUT] /questions/:questionId", async () => {
    const user = await studentFactory.makePrismaStudent();

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: question.id,
    });

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: question.id,
    });

    const attachment3 = await attachmentFactory.makePrismaAttachment();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .put(`/questions/${question.id.toString()}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Edit question",
        content: "Edited content",
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      });

    expect(response.statusCode).toBe(204);

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        title: "Edit question",
      },
    });

    expect(questionOnDataBase).toBeTruthy();

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: questionOnDataBase?.id,
      },
    });

    expect(attachmentOnDatabase).toHaveLength(2);
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: attachment1.id.toString() }),
        expect.objectContaining({ id: attachment3.id.toString() }),
      ])
    );
  });
});
