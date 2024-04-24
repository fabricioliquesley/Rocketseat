import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryGymSRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymSRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymSRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "NodeJS Gym",
      description: "",
      latitude: -20.3833472,
      longitude: -43.4163019,
      phone: "4002-8922",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
