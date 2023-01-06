import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "friendship-request",
    content: new Content("Voce recebeu uma solicitação de amizade."),
    recipientId: "recipient-1",
    ...override,
  })
}
