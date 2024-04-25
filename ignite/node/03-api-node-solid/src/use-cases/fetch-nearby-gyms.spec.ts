import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryGymSRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymSRepository;
let sut: FetchNearbyGymsUseCase;

describe("Search GYM use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymSRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.createGym({
      title: "Near Gym",
      description: "",
      phone: "3557-4000",
      latitude: -20.330418496217895,
      longitude: -43.451698625558215,
    });

    await gymsRepository.createGym({
      title: "Far Gym",
      description: "",
      phone: "3557-4000",
      latitude: -19.91553294412631,
      longitude: -43.940822318057336,
    });

    const { gyms } = await sut.execute({
      userLatitude: -20.3833472,
      userLongitude: -43.4163019,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
