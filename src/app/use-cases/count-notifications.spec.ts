import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";


describe("Count Notifications by Recipient ID", () => {
  it("should be able to count a recipient id number of notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);


    await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
    await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
    await notificationsRepository.create(makeNotification({ recipientId: "recipient-2" }));


    const { count } = await countRecipientNotifications.execute({ recipientId: "recipient-1" });

    expect(count).toEqual(2);
  });

});
