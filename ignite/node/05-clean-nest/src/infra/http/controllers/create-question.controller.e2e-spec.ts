import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AttachmentFactory } from "test/factories/make-attachment";
import { StudentFactory } from "test/factories/make-student";

describe("Create Question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let attachmentFactory: AttachmentFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, AttachmentFactory],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);
    studentFactory = noduleRef.get(StudentFactory);
    attachmentFactory = noduleRef.get(AttachmentFactory);
    jwt = noduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /questions", async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "My new question",
        content: "Question content",
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      });

    expect(response.statusCode).toBe(201);

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        authorId: user.id.toString(),
      },
    });

    expect(questionOnDataBase).toBeTruthy();

    const attachmentsOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: questionOnDataBase?.id,
      },
    });

    expect(attachmentsOnDatabase).toHaveLength(2);
  });
});
