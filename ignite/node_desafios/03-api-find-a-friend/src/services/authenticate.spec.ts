import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { invalidCredentialsError } from "./erros/invalid-credentials-error";

let orgRepository: InMemoryOrgRepository;
let sut: AuthenticateService;

describe("Authenticate use case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new AuthenticateService(orgRepository);
  });

  it("should be able to authenticate org", async () => {
    await orgRepository.createOrg({
      email: "test@org.com",
      password_hash: await hash("1234", 6),
      address: "rua do limão 145, laranjeiras São Paulo",
      name: "org do limoeiro",
      whatsApp_number: "(31) 7070-7070",
    });

    const { org } = await sut.executeAuthenticate({
      email: "test@org.com",
      password: "1234",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it ("should not be able to authenticate org with wrong email", async () => {
    await orgRepository.createOrg({
      email: "test@org.com",
      password_hash: await hash("1234", 6),
      address: "rua do limão 145, laranjeiras São Paulo",
      name: "org do limoeiro",
      whatsApp_number: "(31) 7070-7070",
    });

    expect(async () => {
      await sut.executeAuthenticate({
        email: "test2@org.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError)
  })

  it ("should not be able to authenticate org with wrong password", async () => {
    await orgRepository.createOrg({
      email: "test@org.com",
      password_hash: await hash("1234", 6),
      address: "rua do limão 145, laranjeiras São Paulo",
      name: "org do limoeiro",
      whatsApp_number: "(31) 7070-7070",
    });

    expect(async () => {
      await sut.executeAuthenticate({
        email: "test@org.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError)
  })
});
