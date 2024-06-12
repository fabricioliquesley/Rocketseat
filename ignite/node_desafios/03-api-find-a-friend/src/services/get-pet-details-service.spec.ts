import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetPetDetailsService } from "./get-pet-details-service";
import { randomUUID } from "crypto";
import { PetNotFoundError } from "./erros/pet-not-found-error";

let petRepository: InMemoryPetsRepository;
let sut: GetPetDetailsService;

describe("Get pet details service", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsService(petRepository);
  });

  it("should be able fetch pet details", async () => {
    const id = "s3ew9w2e2";

    await petRepository.createPet({
      id,
      category: "dog",
      gender: "female",
      details:
        "Lola é uma adorável Labrador Retriever de pelagem curta e brilhante, na cor caramelo. Ela possui olhos castanhos expressivos que refletem sua natureza amigável e carinhosa. Com porte médio, Lola é forte e musculosa, característica típica de sua raça, pesando aproximadamente 25 kg. Suas orelhas são caídas e sempre atentas ao ambiente ao seu redor, e sua cauda é longa e está sempre abanando em sinal de alegria.",
      orgId: randomUUID(),
    });

    const { pet } = await sut.executeGetPetDetails({ id });

    expect(pet.details).includes("Lola");
  });

  it("should be not able fetch pet details with wrong id", async () => {
    const wrongId = "s3ew9w2e2";

    await petRepository.createPet({
      id: "",
      category: "dog",
      gender: "female",
      details:
        "Lola é uma adorável Labrador Retriever de pelagem curta e brilhante, na cor caramelo. Ela possui olhos castanhos expressivos que refletem sua natureza amigável e carinhosa. Com porte médio, Lola é forte e musculosa, característica típica de sua raça, pesando aproximadamente 25 kg. Suas orelhas são caídas e sempre atentas ao ambiente ao seu redor, e sua cauda é longa e está sempre abanando em sinal de alegria.",
      orgId: randomUUID(),
    });

    expect(async () => {
      await sut.executeGetPetDetails({ id: wrongId });
    }).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
