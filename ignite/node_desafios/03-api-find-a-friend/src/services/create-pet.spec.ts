import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreatePetService } from "./create-pet";

let petRepository: InMemoryPetsRepository;
let sut: CreatePetService;

describe("Create pet service", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository();
    sut = new CreatePetService(petRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.executeCreate({
      category: "dog",
      gender: "female",
      details: "Uma bela cadela da raça Pug",
      orgId: "org-01",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
