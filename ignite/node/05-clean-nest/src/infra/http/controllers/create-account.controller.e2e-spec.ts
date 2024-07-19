import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Create account (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const noduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = noduleRef.createNestApplication();
    prisma = noduleRef.get(PrismaService);

    await app.init();
  });

  test("[POST] /account", async () => {
    const response = await request(app.getHttpServer()).post("/accounts").send({
      name: "John Doe",
      email: "john@doe.com",
      password: "12345678",
    });

    expect(response.statusCode).toBe(201);

    const userOnDataBase = await prisma.user.findUnique({
      where: {
        email: "john@doe.com",
      },
    });

    expect(userOnDataBase).toBeTruthy();
  });
});
