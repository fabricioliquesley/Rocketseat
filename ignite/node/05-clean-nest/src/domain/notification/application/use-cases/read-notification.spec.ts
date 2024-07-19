import { expect, describe, it, beforeEach } from "vitest";
import { ReadNotificationUseCase } from "./read-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { makeNotification } from "test/factories/make-notification";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const fakeNotification = makeNotification();

    await inMemoryNotificationsRepository.create(fakeNotification);

    const result = await sut.execute({
      recipientId: fakeNotification.recipientId.toString(),
      notificationId: fakeNotification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it("it shouldn't be possible to read a notification if you're not the recipient", async () => {
    const fakeNotification = makeNotification();

    await inMemoryNotificationsRepository.create(fakeNotification);

    const result = await sut.execute({
      notificationId: fakeNotification.id.toString(),
      recipientId: "RX03",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
