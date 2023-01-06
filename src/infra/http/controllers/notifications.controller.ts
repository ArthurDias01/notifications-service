import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
// import { randomUUID } from 'node:crypto'
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '../../../app/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) { }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
