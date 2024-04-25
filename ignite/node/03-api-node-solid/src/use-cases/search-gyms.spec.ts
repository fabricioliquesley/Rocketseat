import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryGymSRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymSRepository;
let sut: SearchGymsUseCase;

describe("Search GYM use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymSRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.createGym({
      title: "Suando com java",
      description: "",
      phone: "3557-4000",
      latitude: -20.330418496217895,
      longitude: -43.451698625558215,
    });

    await gymsRepository.createGym({
      title: "Treino fofo com python",
      description: "",
      phone: "3557-4000",
      latitude: -20.330418496217895,
      longitude: -43.451698625558215,
    });

    const { gyms } = await sut.execute({
      query: "java",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Suando com java" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.createGym({
        title: `python forte Gym ${i}`,
        description: "",
        phone: "3557-4000",
        latitude: -20.330418496217895,
        longitude: -43.451698625558215,
      });
    }

    const { gyms } = await sut.execute({
      query: "python",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "python forte Gym 21" }),
      expect.objectContaining({ title: "python forte Gym 22" }),
    ]);
  });
});
