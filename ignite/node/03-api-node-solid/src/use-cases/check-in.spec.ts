import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymSRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberCheckInError } from "./errors/max-number-of-check-in-error";

let checkInRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymSRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymSRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    await gymsRepository.createGym({
      id: "gym-01",
      title: "NodeJS Gym",
      description: "",
      latitude: -20.3833472,
      longitude: -43.4163019,
      phone: "4002-8922",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -20.3833472,
      userLongitude: -43.4163019,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 11, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -20.3833472,
      userLongitude: 0 - 43.4163019,
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -20.3833472,
        userLongitude: 0 - 43.4163019,
      })
    ).rejects.toBeInstanceOf(MaxNumberCheckInError);
  });

  it("should be able to check in twice but in different day", async () => {
    vi.setSystemTime(new Date(2022, 0, 11, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -20.3833472,
      userLongitude: 0 - 43.4163019,
    });

    vi.setSystemTime(new Date(2022, 0, 12, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -20.3833472,
      userLongitude: 0 - 43.4163019,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "NodeJS Gym",
      description: "",
      latitude: new Decimal(-17.4698137),
      longitude: new Decimal(-41.8831651),
      phone: "4002-8922",
    });

    await expect(
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -20.3833472,
        userLongitude: -43.4163019,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
