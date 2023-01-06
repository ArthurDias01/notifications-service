import { Module } from "@nestjs/common";
import { NotificationsController } from "./controllers/notifications.controller";
import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnReadNotification } from "@application/use-cases/unread-notification";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";


@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    ReadNotification,
    UnReadNotification,
    GetRecipientNotifications,
  ],
})
export class HttpModule { }
