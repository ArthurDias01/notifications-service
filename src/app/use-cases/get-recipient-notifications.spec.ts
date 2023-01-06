import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";


describe("Get Notifications by Recipient ID", () => {
  it("should be able to get a list of notifications by recipient id", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
    await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
    await notificationsRepository.create(makeNotification({ recipientId: "recipient-2" }));

    const { notifications } = await countRecipientNotifications.execute({ recipientId: "recipient-1" });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: "recipient-1" }),
      expect.objectContaining({ recipientId: "recipient-1" }),
    ])
    );
  });

});
