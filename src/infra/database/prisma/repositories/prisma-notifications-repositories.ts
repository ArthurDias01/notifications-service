import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

  constructor(private prismaService: PrismaService) { }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      }
    });

    if (!notification) {
      throw new NotificationNotFound();
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<any[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      }
    });

    return notifications.map((notification) => PrismaNotificationMapper.toDomain(notification));
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId,
      }
    });
  }

  async create(notification: Notification): Promise<void> {

    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: raw,
    });
  }
}
