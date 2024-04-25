import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics use case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInRepository.createCheckIn({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInRepository.createCheckIn({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkCount).toBe(2)
  });
});
