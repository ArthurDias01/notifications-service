import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { UnReadNotification } from "./unread-notification";

describe("UnRead Notification", () => {
  it("should be able to unread a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date()
    });

    await notificationsRepository.create(notification);

    await unReadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to unread a notification that does not exist", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotification(notificationsRepository);

    expect(() => { return unReadNotification.execute({ notificationId: "fake-notification-id" }) }
    ).rejects.toThrowError(NotificationNotFound);
  });
});
