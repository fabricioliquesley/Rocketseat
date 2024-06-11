import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { RegisterServices } from "./register";
import { OrgAlreadyExistsError } from "./erros/org-already-exists-error";

let orgRepository: InMemoryOrgRepository;
let sut: RegisterServices;

describe("Register services", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new RegisterServices(orgRepository);
  });

  it("should be able to register", async () => {
    const { org } = await sut.executeRegister({
      email: "test@org.com",
      password: "1234",
      address: "rua do limão 145, laranjeiras São Paulo",
      name: "org do limoeiro",
      whatsApp_number: "(31) 7070-7070",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email", async () => {
    const email = "test@org.com";

    await sut.executeRegister({
      email,
      password: "1234",
      address: "rua do limão 145, laranjeiras São Paulo",
      name: "org do limoeiro",
      whatsApp_number: "(31) 7070-7070",
    });

    expect(async () => {
      await sut.executeRegister({
        email,
        password: "1234",
        address: "rua do limão 145, laranjeiras São Paulo",
        name: "org do limoeiro",
        whatsApp_number: "(31) 7070-7070",
      });
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
